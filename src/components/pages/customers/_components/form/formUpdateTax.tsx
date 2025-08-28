"use client";

import { Button, Flex, Form, Input } from "antd";
import { useTranslations } from "next-intl";
import { Dispatch, SetStateAction, useCallback, useEffect } from "react";
import { FaPencilAlt, FaPlus } from "react-icons/fa";

import useAddTaxMutation, {
  AddTaxSchemaPayload,
  IAddTaxMutationPayload,
} from "@/common/custom/hooks/api/mutation/tax/useAddTaxMutation";
import useUpdateTaxMutation from "@/common/custom/hooks/api/mutation/tax/useUpdateTaxMutation";
import { ITax } from "@/common/interfaces/data/tax";
import { TaxCategoryEnum } from "@/common/interfaces/enum/taxCategory.enum";
import { setZodFormErrors } from "@/common/lib/setZodFormErrors";

interface FormUpdateTaxProps {
  customerId: string;
  data: ITax | undefined;
  isModal: boolean;
  setIsModal: Dispatch<SetStateAction<boolean>>;
}

export const FormUpdateTax = ({
  customerId,
  data,
  isModal,
  setIsModal,
}: FormUpdateTaxProps) => {
  const [form] = Form.useForm<IAddTaxMutationPayload>();
  const t = useTranslations("modalUpdateTaxInformation");

  const { mutate, isPending } = useAddTaxMutation({
    onSuccessCallback: () => {
      setIsModal(false);
      form.resetFields();
    },
  });

  const { mutate: updateMutate, isPending: updateIsPending } =
    useUpdateTaxMutation({
      onSuccessCallback: () => {
        setIsModal(false);
        form.resetFields();
      },
    });

  useEffect(() => {
    if (!isModal || !data) return form.resetFields();
    form.setFieldsValue({
      npwp: data.npwp,
      fgPpn: data.fgPpn,
      nppkp: data.nppkp,
      category: TaxCategoryEnum.CUSTOMER,
    });
  }, [data, form, isModal]);

  const handleFinish = useCallback(async () => {
    const values = await form.validateFields();
    const cleaned = Object.fromEntries(
      Object.entries({
        ...values,
        customerId: customerId,
        category: TaxCategoryEnum.CUSTOMER,
      }).filter(([_, value]) => !!value || value === "")
    );
    const parsed = AddTaxSchemaPayload.safeParse(cleaned);
    if (!parsed.success) return setZodFormErrors(parsed.error, form);
    if (data?.id) return updateMutate(parsed.data);
    mutate(parsed.data);
  }, [customerId, data, form, mutate, updateMutate]);

  return (
    <Form form={form} layout="vertical" onFinish={handleFinish}>
      <Form.Item name="npwp" label={t("form.npwp")}>
        <Input placeholder={t("form.npwp")} />
      </Form.Item>
      <Form.Item name="fgPpn" label={t("form.fgPpn")}>
        <Input placeholder={t("form.fgPpn")} />
      </Form.Item>
      <Form.Item name="nppkp" label={t("form.nppkp")}>
        <Input placeholder={t("form.nppkp")} />
      </Form.Item>
      <Flex justify="end">
        <Button
          type="primary"
          htmlType="submit"
          ghost
          icon={data?.id ? <FaPencilAlt /> : <FaPlus />}
          loading={isPending || updateIsPending}
        >
          {data?.id ? t("form.submit.update") : t("form.submit.add")}
        </Button>
      </Flex>
    </Form>
  );
};
