"use client";

import { Button, Flex, Form, Input } from "antd";
import { useTranslations } from "next-intl";
import { Dispatch, SetStateAction, useCallback, useEffect } from "react";
import { FaPencilAlt } from "react-icons/fa";

import useGetContactByUserIDFetch from "@/common/custom/hooks/api/fetcher/contact/useGetContactByCustomerIDFetch";
import useUpdateContactMutation, {
  IUpdateContactMutationPayload,
  UpdateContactSchemaPayload,
} from "@/common/custom/hooks/api/mutation/contact/useUpdateContactMutation";
import { ICustomer } from "@/common/interfaces/data/customer";
import { ContactCategoryEnum } from "@/common/interfaces/enum/contactCategory.enum";
import { setZodFormErrors } from "@/common/lib/setZodFormErrors";

interface FormUpdateContactProps {
  customer: ICustomer;
  isModal: boolean;
  setIsModal: Dispatch<SetStateAction<boolean>>;
}

export const FormUpdateContact = ({
  customer,
  isModal,
  setIsModal,
}: FormUpdateContactProps) => {
  const [form] = Form.useForm<IUpdateContactMutationPayload>();
  const t = useTranslations("modalUpdateContact");

  const { data: dataContact } = useGetContactByUserIDFetch({
    params: { customerId: customer.id },
    enabled: isModal,
  });

  useEffect(() => {
    if (!isModal || !dataContact?.data) return;
    form.setFieldsValue({
      city: dataContact?.data.city,
      address1: dataContact?.data.address1,
      address2: dataContact?.data.address2,
      zipCode: dataContact?.data.zipCode,
      phoneNumber: dataContact?.data.phoneNumber,
    });
  }, [isModal, dataContact?.data, form]);

  const { mutate, isPending } = useUpdateContactMutation({
    onSuccessCallback: () => {
      setIsModal(false);
      form.resetFields();
    },
  });

  const handleFinish = useCallback(async () => {
    const values = await form.validateFields();
    const cleaned = Object.fromEntries(
      Object.entries({
        ...values,
        isActive: customer.isActive,
        customerId: customer.id,
        category: ContactCategoryEnum.CUSTOMER,
      }).filter(([_, value]) => !!value || value === "")
    );
    const parsed = UpdateContactSchemaPayload.safeParse(cleaned);
    if (!parsed.success) return setZodFormErrors(parsed.error, form);
    mutate(parsed.data);
  }, [customer, form, mutate]);

  return (
    <Form form={form} layout="vertical" onFinish={handleFinish}>
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
