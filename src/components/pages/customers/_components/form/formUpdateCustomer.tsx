"use client";

import { Button, Flex, Form, Input, Select } from "antd";
import { useTranslations } from "next-intl";
import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from "react";
import { FaPencilAlt } from "react-icons/fa";

import useGetContactByUserIDFetch from "@/common/custom/hooks/api/fetcher/contact/useGetContactByCustomerIDFetch";
import useGetListCustomerTypeFetch from "@/common/custom/hooks/api/fetcher/customer-type/useGetListCustomerTypeFetch";
import useUpdateCustomerMutation, {
  IUpdateCustomerMutationPayload,
  UpdateCustomerSchemaPayload,
} from "@/common/custom/hooks/api/mutation/customers/useUpdateCustomerMutation";
import { useDebounce } from "@/common/custom/hooks/share/useDebounce";
import { ICustomer } from "@/common/interfaces/data/customer";
import { setZodFormErrors } from "@/common/lib/setZodFormErrors";
import { DEFAULT_PAGINATION } from "@/common/var/pagination";

interface FormUpdateCustomerProps {
  customer: ICustomer;
  isModal: boolean;
  setIsModal: Dispatch<SetStateAction<boolean>>;
}

export const FormUpdateCustomer = ({
  customer,
  isModal,
  setIsModal,
}: FormUpdateCustomerProps) => {
  const [pagination] = useState(DEFAULT_PAGINATION);
  const [search, setSearch] = useState<string | undefined>(undefined);
  const [form] = Form.useForm<IUpdateCustomerMutationPayload>();
  const searchDebounce = useDebounce(search);
  const t = useTranslations("modalUpdateCustomer");

  const { data: dataContact, isPending: isContactPending } =
    useGetContactByUserIDFetch({
      params: { customerId: customer.id },
      enabled: isModal,
    });

  const { data: dataCustomerType, isPending: isCustomerTypePending } =
    useGetListCustomerTypeFetch({
      params: {
        pagination: { ...pagination, search: searchDebounce },
        filters: { isActive: true },
      },
      enabled: isModal,
    });

  useEffect(() => {
    if (isContactPending || !isModal) return;
    form.setFieldsValue({
      name: customer.name,
      customerTypeId: customer.customerTypeId,
      city: dataContact?.data.city,
      address1: dataContact?.data.address1,
      address2: dataContact?.data.address2,
      zipCode: dataContact?.data.zipCode,
      phoneNumber: dataContact?.data.phoneNumber,
    });
  }, [isModal, dataContact?.data, form, customer, isContactPending]);

  const { mutate, isPending } = useUpdateCustomerMutation({
    onSuccessCallback: () => {
      setIsModal(false);
      setSearch(undefined);
      form.resetFields();
    },
  });

  const handleFinish = useCallback(async () => {
    const values = await form.validateFields();
    const cleaned = Object.fromEntries(
      Object.entries({
        ...values,
        id: customer.id,
        isActive: customer.isActive,
      }).filter(([_, value]) => !!value || value === "")
    );
    const parsed = UpdateCustomerSchemaPayload.safeParse(cleaned);
    if (!parsed.success) return setZodFormErrors(parsed.error, form);
    mutate(parsed.data);
  }, [customer, form, mutate]);

  return (
    <Form form={form} layout="vertical" onFinish={handleFinish}>
      <Form.Item name="name" label={t("form.name.label")}>
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
          {dataCustomerType?.data.map((d, i) => (
            <Select.Option key={i} value={d.id}>
              {d.name}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item name="city" label={t("form.city.label")}>
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
      <Form.Item name="phoneNumber" label={t("form.phoneNumber.label")}>
        <Input placeholder={t("form.phoneNumber.placeholder")} />
      </Form.Item>
      <Flex justify="end">
        <Button
          type="primary"
          htmlType="submit"
          loading={isPending}
          icon={<FaPencilAlt />}
        >
          {t("form.submit")}
        </Button>
      </Flex>
    </Form>
  );
};
