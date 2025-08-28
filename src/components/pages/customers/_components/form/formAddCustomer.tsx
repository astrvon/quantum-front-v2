"use client";

import { Button, Flex, Form, Input, Select } from "antd";
import { useTranslations } from "next-intl";
import { Dispatch, SetStateAction, useState } from "react";
import { FaPlus } from "react-icons/fa";

import useGetListCustomerTypeFetch from "@/common/custom/hooks/api/fetcher/customer-type/useGetListCustomerTypeFetch";
import useAddCustomerMutation, {
  AddCustomerSchemaPayload,
  IAddCustomerMutationPayload,
} from "@/common/custom/hooks/api/mutation/customers/useAddCustomerMutation";
import { useDebounce } from "@/common/custom/hooks/share/useDebounce";
import { setZodFormErrors } from "@/common/lib/setZodFormErrors";
import { DEFAULT_PAGINATION } from "@/common/var/pagination";

interface FormAddCustomerProps {
  isModal: boolean;
  setIsModal: Dispatch<SetStateAction<boolean>>;
}

export const FormAddCustomer = ({
  isModal,
  setIsModal,
}: FormAddCustomerProps) => {
  const [pagination] = useState(DEFAULT_PAGINATION);
  const [search, setSearch] = useState<string | undefined>(undefined);
  const [form] = Form.useForm<IAddCustomerMutationPayload>();
  const searchDebounce = useDebounce(search);
  const t = useTranslations("modalAddCustomer");

  const { mutate, isPending } = useAddCustomerMutation({
    onSuccessCallback: () => {
      setIsModal(false);
      setSearch(undefined);
      form.resetFields();
    },
  });

  const { data, isPending: isCustomerTypePending } =
    useGetListCustomerTypeFetch({
      params: {
        pagination: { ...pagination, search: searchDebounce },
        filters: { isActive: true },
      },
      enabled: isModal,
    });

  const handleFinish = async () => {
    const values = await form.validateFields();
    const parsed = AddCustomerSchemaPayload.safeParse(values);
    if (!parsed.success) return setZodFormErrors(parsed.error, form);
    mutate(parsed.data);
  };

  return (
    <Form form={form} layout="vertical" onFinish={handleFinish}>
      <Form.Item
        name="name"
        label={t("form.name.label")}
        rules={[{ required: true, message: t("form.name.requiredMessage") }]}
        required
      >
        <Input placeholder={t("form.name.placeholder")} />
      </Form.Item>
      <Form.Item name="customerTypeId" label={t("form.type.label")}>
        <Select
          showSearch
          onSearch={setSearch}
          allowClear={true}
          style={{ width: "100%" }}
          placeholder={t("form.type.placeholder")}
          loading={isCustomerTypePending}
          filterOption={false}
        >
          {data?.data.map((d, i) => (
            <Select.Option key={i} value={d.id}>
              {d.name}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item
        name="city"
        label={t("form.city.label")}
        rules={[{ required: true, message: t("form.city.requiredMessage") }]}
        required
      >
        <Input placeholder={t("form.city.placeholder")} />
      </Form.Item>
      <Form.Item name="address1" label={t("form.address1.label")}>
        <Input.TextArea placeholder={t("form.address1.placeholder")} />
      </Form.Item>
      <Form.Item name="address2" label={t("form.address2.label")}>
        <Input.TextArea placeholder={t("form.address2.placeholder")} />
      </Form.Item>
      <Form.Item name="zipCode" label={t("form.zipCode.label")}>
        <Input placeholder={t("form.zipCode.placeholder")} />
      </Form.Item>
      <Form.Item
        name="phoneNumber"
        label={t("form.phoneNumber.label")}
        rules={[
          {
            required: true,
            message: t("form.phoneNumber.requiredMessage"),
          },
        ]}
        required
      >
        <Input placeholder={t("form.phoneNumber.placeholder")} />
      </Form.Item>
      <Flex justify="end">
        <Button
          type="primary"
          htmlType="submit"
          loading={isPending}
          icon={<FaPlus />}
        >
          {t("form.submit")}
        </Button>
      </Flex>
    </Form>
  );
};
