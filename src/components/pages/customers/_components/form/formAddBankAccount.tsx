"use client";

import { Button, Flex, Form, Input, Select } from "antd";
import { useTranslations } from "next-intl";
import { Dispatch, SetStateAction, useCallback } from "react";
import { FaPlus } from "react-icons/fa";

import useGetListBankTypeFetch from "@/common/custom/hooks/api/fetcher/bank-type/useGetListBankTypeFetch";
import useAddBankAccountMutation, {
  AddBankAccountSchemaPayload,
  IAddBankAccountMutationPayload,
} from "@/common/custom/hooks/api/mutation/bank-account/useAddBankAccountMutation";
import { BankAccountCategoryEnum } from "@/common/interfaces/enum/bankAccountCategory";
import { setZodFormErrors } from "@/common/lib/setZodFormErrors";
import { DEFAULT_PAGINATION } from "@/common/var/pagination";

interface FormAddBankAccountProps {
  customerId: string;
  isModal: boolean;
  setIsModal: Dispatch<SetStateAction<boolean>>;
}

export const FormAddBankAccount = ({
  customerId,
  isModal,
  setIsModal,
}: FormAddBankAccountProps) => {
  const [form] = Form.useForm<IAddBankAccountMutationPayload>();
  const t = useTranslations("modalAddBankAccount");

  const { data: dataBankType, isPending: isBankTypePending } =
    useGetListBankTypeFetch({
      enabled: isModal,
      params: { pagination: { ...DEFAULT_PAGINATION } },
    });

  const { mutate, isPending } = useAddBankAccountMutation({
    onSuccessCallback: () => {
      setIsModal(false);
      form.resetFields();
    },
  });

  const handleFinish = useCallback(async () => {
    const values = await form.validateFields();
    const parsed = AddBankAccountSchemaPayload.safeParse({
      ...values,
      category: BankAccountCategoryEnum.CUSTOMER,
      customerId,
    });
    if (!parsed.success) return setZodFormErrors(parsed.error, form);
    mutate(parsed.data);
  }, [customerId, form, mutate]);

  return (
    <Form form={form} layout="vertical" onFinish={handleFinish}>
      <Form.Item name="holderName" label={t("form.holderName")}>
        <Input placeholder={t("form.holderName")} />
      </Form.Item>
      <Form.Item name="accountNumber" label={t("form.accountNumber")}>
        <Input placeholder={t("form.accountNumber")} />
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
