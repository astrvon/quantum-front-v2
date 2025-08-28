"use client";

import { Button, Form, Input, Modal, Tooltip } from "antd";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { TbPencil } from "react-icons/tb";

import useUpdateScopeMutation, {
  IUpdateScopeMutationPayload,
  ScopeUpdateSchemaPayload,
} from "@/common/custom/hooks/api/mutation/scopes/useUpdateScopeMutation";
import { IScope } from "@/common/interfaces/data/scope";
import { setZodFormErrors } from "@/common/lib/setZodFormErrors";

interface ModalUpdateScopeParams {
  payload: IScope;
}

export const ModalUpdateScope = ({ payload }: ModalUpdateScopeParams) => {
  const t = useTranslations("RolePage.updateScope");

  const [isModal, setModal] = useState(false);
  const [form] = Form.useForm<Omit<IUpdateScopeMutationPayload, "id">>();

  const { mutate, isPending } = useUpdateScopeMutation({
    onSuccessCallback: () => {
      setModal(false);
      form.resetFields();
    },
  });

  const handleFinish = async () => {
    const values = await form.validateFields();
    const parsed = ScopeUpdateSchemaPayload.safeParse({
      id: payload.id,
      ...values,
    });
    if (!parsed.success) return setZodFormErrors(parsed.error, form);
    mutate(parsed.data);
  };

  return (
    <div>
      <Tooltip title={t("tooltip")}>
        <Button
          ghost
          type="primary"
          loading={isPending}
          onClick={() => {
            setModal(true);
            form.setFieldsValue({ name: payload.name });
          }}
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
        <Form
          form={form}
          onFinish={handleFinish}
          layout="vertical"
          initialValues={{ name: payload.name }}
        >
          <Form.Item name="name" label={t("form.name.label")}>
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
