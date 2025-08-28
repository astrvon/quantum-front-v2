"use client";

import { Button, Form, Input, Modal } from "antd";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { LiaUserPlusSolid } from "react-icons/lia";

import useCreateScopesMutation, {
  CreateScopesSchemaPayload,
  ICreateScopesMutationPayload,
} from "@/common/custom/hooks/api/mutation/scopes/useCreateScopesMutation";
import { setZodFormErrors } from "@/common/lib/setZodFormErrors";

export const ModalAddScope = () => {
  const t = useTranslations("RolePage.addScope");

  const [isModal, setModal] = useState(false);
  const [form] = Form.useForm<ICreateScopesMutationPayload>();

  const { mutate, isPending } = useCreateScopesMutation({
    onSuccessCallback: () => {
      setModal(false);
      form.resetFields();
    },
  });

  const handleFinish = async () => {
    const values = await form.validateFields();
    const parsed = CreateScopesSchemaPayload.safeParse(values);
    if (!parsed.success) return setZodFormErrors(parsed.error, form);
    mutate(parsed.data);
  };

  return (
    <div>
      <Button
        type="primary"
        onClick={() => setModal(true)}
        loading={isPending}
        icon={<LiaUserPlusSolid size={"20"} />}
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
            rules={[{ required: true, message: t("form.name.required") }]}
            required
          >
            <Input placeholder={t("form.name.placeholder")} />
          </Form.Item>

          <Button type="primary" block htmlType="submit">
            {t("form.submit")}
          </Button>
        </Form>
      </Modal>
    </div>
  );
};
