"use client";

import { Button, Flex, Form, Select } from "antd";
import { useTranslations } from "next-intl";
import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from "react";
import { FaPlus } from "react-icons/fa";

import useGetListUsersFetch from "@/common/custom/hooks/api/fetcher/users/useGetListUsersFetch";
import useAddUsersToCustomerMutation, {
  AddUsersToCustomerSchemaPayload,
  IAddUsersToCustomerMutationPayload,
} from "@/common/custom/hooks/api/mutation/users/useAddUsersToCustomer";
import { useDebounce } from "@/common/custom/hooks/share/useDebounce";
import { setZodFormErrors } from "@/common/lib/setZodFormErrors";
import { DEFAULT_PAGINATION } from "@/common/var/pagination";

interface FormAddUsersProps {
  customerId: string;
  isModal: boolean;
  setIsModal: Dispatch<SetStateAction<boolean>>;
}

export const FormAddUsers = ({
  customerId,
  isModal,
  setIsModal,
}: FormAddUsersProps) => {
  const [search, setSearch] = useState<string | undefined>(undefined);
  const [pagination] = useState(DEFAULT_PAGINATION);
  const [form] = Form.useForm<IAddUsersToCustomerMutationPayload>();
  const searchDebounce = useDebounce(search);
  const t = useTranslations("modalAddUsers");

  const { data, isPending } = useGetListUsersFetch({
    params: {
      pagination: { ...pagination, search: searchDebounce },
      filters: { hasCustomer: false },
    },
    enabled: isModal,
  });

  const { mutate, isPending: isMutatePending } = useAddUsersToCustomerMutation({
    onSuccessCallback: () => {
      setIsModal(false);
      form.resetFields();
    },
  });

  const handleFinish = useCallback(async () => {
    const values = await form.validateFields();
    const parsed = AddUsersToCustomerSchemaPayload.safeParse({
      ...values,
      customerId,
    });
    if (!parsed.success) return setZodFormErrors(parsed.error, form);
    mutate(parsed.data);
  }, [customerId, form, mutate]);

  useEffect(() => {
    if (isModal) return;
    form.resetFields();
  }, [form, isModal]);

  return (
    <Form form={form} layout="vertical" onFinish={handleFinish}>
      <Form.Item
        name="ids"
        label={t("form.users.label")}
        rules={[{ required: true, message: t("form.users.requiredMessage") }]}
        required={true}
      >
        <Select
          showSearch
          onSearch={setSearch}
          mode="multiple"
          allowClear={false}
          style={{ width: "100%" }}
          placeholder={t("form.users.placeholder")}
          loading={isPending}
          filterOption={false}
        >
          {data?.data?.map((d, i) => (
            <Select.Option key={i} value={d.id}>
              {d.name}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>
      <Flex justify="end">
        <Button
          type="primary"
          htmlType="submit"
          loading={isMutatePending}
          icon={<FaPlus />}
        >
          {t("form.submit")}
        </Button>
      </Flex>
    </Form>
  );
};
