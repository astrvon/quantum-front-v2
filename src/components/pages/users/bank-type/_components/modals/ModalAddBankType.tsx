"use client";

import { PlusOutlined } from "@ant-design/icons";
import { Button, Form, Input, Modal } from "antd";
import { useTranslations } from "next-intl";
import { useState } from "react";

import useCreateBankTypeMutation, {
  CreateBankTypeSchemaPayload,
  ICreateBankTypeMutationPayload,
} from "@/common/custom/hooks/api/mutation/bank-type/useCreateBankTypeMutation";
import { setZodFormErrors } from "@/common/lib/setZodFormErrors";

export const ModalAddBankType = () => {
  const t = useTranslations("BankTypeCreateModal");

  const [isModal, setModal] = useState(false);
  const [form] = Form.useForm<ICreateBankTypeMutationPayload>();

  const { mutate, isPending } = useCreateBankTypeMutation({
    onSuccessCallback: () => {
      setModal(false);
      form.resetFields();
    },
  });

  const handleFinish = async () => {
    const values = await form.validateFields();
    const parsed = CreateBankTypeSchemaPayload.safeParse(values);
    if (!parsed.success) return setZodFormErrors(parsed.error, form);
    mutate(parsed.data);
  };

  return (
    <div>
      <Button
        type="primary"
        onClick={() => setModal(true)}
        loading={isPending}
        icon={<PlusOutlined />}
      >
        {t("button")}
      </Button>
      <Modal
        open={isModal}
        onCancel={() => setModal(false)}
        footer={false}
        width={500}
        loading={isPending}
        title={t("title")}
      >
        <Form form={form} onFinish={handleFinish} layout="vertical">
          <Form.Item
            name="name"
            label={t("form.name.label")}
            rules={[{ required: true }]}
            required
          >
            <Input placeholder={t("form.name.placeholder")} />
          </Form.Item>
          <Form.Item name="bankCode" label={t("form.bankCode.label")} required>
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
