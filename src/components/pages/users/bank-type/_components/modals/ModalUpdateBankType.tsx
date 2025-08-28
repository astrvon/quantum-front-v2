"use client";

import { Button, Form, Input, Modal, Tooltip } from "antd";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { TbPencil } from "react-icons/tb";

import useUpdateBankTypeMutation, {
  IUpdateBankTypeMutationPayload,
  UpdateBankTypeSchemaPayload,
} from "@/common/custom/hooks/api/mutation/bank-type/useUpdateBankTypeMutation";
import { IBankType } from "@/common/interfaces/data/bankType";
import { setZodFormErrors } from "@/common/lib/setZodFormErrors";

interface ModalUpdateBankTypeParams {
  payload: IBankType;
}

export const ModalUpdateBankType = ({ payload }: ModalUpdateBankTypeParams) => {
  const t = useTranslations("BankTypeUpdateModal");
  const [isModal, setModal] = useState(false);
  const [form] = Form.useForm<Omit<IUpdateBankTypeMutationPayload, "id">>();

  const { mutate, isPending } = useUpdateBankTypeMutation({
    onSuccessCallback: () => {
      setModal(false);
      form.resetFields();
    },
  });

  const handleFinish = async () => {
    const values = await form.validateFields();
    const parsed = UpdateBankTypeSchemaPayload.safeParse({
      id: payload.id,
      ...values,
    });
    if (!parsed.success) return setZodFormErrors(parsed.error, form);
    mutate(parsed.data);
  };

  useEffect(() => {
    form.setFieldsValue({
      name: payload.name,
      bankCode: payload.bankCode,
    });
  }, [form, payload]);

  return (
    <div>
      <Tooltip title={t("tooltip")}>
        <Button
          ghost
          type="primary"
          loading={isPending}
          onClick={() => setModal(true)}
          icon={<TbPencil size={"20"} />}
        />
      </Tooltip>
      <Modal
        open={isModal}
        onCancel={() => setModal(false)}
        footer={false}
        width={500}
        loading={isPending}
        title={t("title", { name: payload.name })}
      >
        <Form form={form} onFinish={handleFinish} layout="vertical">
          <Form.Item name="name" label={t("form.name.label")} required={false}>
            <Input placeholder={t("form.name.placeholder")} />
          </Form.Item>
          <Form.Item
            name="bankCode"
            label={t("form.bankCode.label")}
            required={false}
          >
            <Input placeholder={t("form.bankCode.placeholder")} />
          </Form.Item>
          <Button type="primary" block htmlType="submit">
            {t("form.submit")}
          </Button>
        </Form>
      </Modal>
    </div>
  );
};
