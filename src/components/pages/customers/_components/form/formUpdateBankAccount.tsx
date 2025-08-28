"use client";

import { Button, Flex, Form, Input, Select } from "antd";
import { useTranslations } from "next-intl";
import { Dispatch, SetStateAction, useCallback, useEffect } from "react";

import useGetListBankTypeFetch from "@/common/custom/hooks/api/fetcher/bank-type/useGetListBankTypeFetch";
import useUpdateBankAccountMutation, {
  IUpdateBankAccountMutationPayload,
  UpdateBankAccountSchemaPayload,
} from "@/common/custom/hooks/api/mutation/bank-account/useUpdateBankAccountMutation";
import { IBankAccount } from "@/common/interfaces/data/bankAccount";
import { setZodFormErrors } from "@/common/lib/setZodFormErrors";
import { DEFAULT_PAGINATION } from "@/common/var/pagination";

interface FormUpdateBankAccountProps {
  data: IBankAccount;
  isModal: boolean;
  setIsModal: Dispatch<SetStateAction<boolean>>;
}

export const FormUpdateBankAccount = ({
  data,
  isModal,
  setIsModal,
}: FormUpdateBankAccountProps) => {
  const [form] = Form.useForm<IUpdateBankAccountMutationPayload>();
  const t = useTranslations("modalUpdateBankAccount");

  const { mutate, isPending } = useUpdateBankAccountMutation({
    onSuccessCallback: () => {
      setIsModal(false);
      form.resetFields();
    },
  });

  const { data: dataBankType, isPending: isBankTypePending } =
    useGetListBankTypeFetch({
      enabled: isModal,
      params: { pagination: { ...DEFAULT_PAGINATION } },
    });

  const handleFinish = useCallback(async () => {
    const values = await form.validateFields();
    const cleaned = Object.fromEntries(
      Object.entries({
        ...values,
        id: data.id,
        customerId: data.customerId,
        category: data.category,
      }).filter(([_, value]) => !!value || value === "")
    );
    const parsed = UpdateBankAccountSchemaPayload.safeParse(cleaned);
    if (!parsed.success) return setZodFormErrors(parsed.error, form);
    mutate(parsed.data);
  }, [data, form, mutate]);

  useEffect(() => {
    if (!isModal) return form.resetFields();
    form.setFieldsValue({
      holderName: data.holderName,
      accountNumber: data.accountNumber,
      bankTypeId: data.bankTypeId,
    });
  });

  return (
    <Form form={form} layout="vertical" onFinish={handleFinish}>
      <Form.Item name="holderName" label={t("form.holderName")}>
        <Input placeholder="Holder name" />
      </Form.Item>
      <Form.Item name="accountNumber" label={t("form.accountNumber")}>
        <Input placeholder="Account number" />
      </Form.Item>
      <Form.Item name="bankTypeId" label={t("form.bankType.label")}>
        <Select
          placeholder={t("form.bankType.placeholder")}
          loading={isBankTypePending}
        >
          {dataBankType?.data.map((d, i) => (
            <Select.Option key={i} value={d.id}>
              {d.name}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>
      <Flex justify="end">
        <Button type="primary" htmlType="submit" ghost loading={isPending}>
          {t("form.submit")}
        </Button>
      </Flex>
    </Form>
  );
};
