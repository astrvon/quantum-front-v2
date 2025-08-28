"use client";

import { Button, Form, Input, Modal, Tooltip } from "antd";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { TbPencil } from "react-icons/tb";

import useUpdateCustomerTypeMutation, {
  IUpdateCustomerTypeMutationPayload,
  UpdateCustomerTypeSchemaPayload,
} from "@/common/custom/hooks/api/mutation/customer-type/useUpdateCustomerTypeMutation";
import { ICustomerType } from "@/common/interfaces/data/customerType";
import { setZodFormErrors } from "@/common/lib/setZodFormErrors";

interface ModalUpdateCustomerTypeParams {
  payload: ICustomerType;
}

export const ModalUpdateCustomerType = ({
  payload,
}: ModalUpdateCustomerTypeParams) => {
  const t = useTranslations("CustomerTypeUpdateModal");
  const [isModal, setModal] = useState(false);
  const [form] = Form.useForm<Omit<IUpdateCustomerTypeMutationPayload, "id">>();

  const { mutate, isPending } = useUpdateCustomerTypeMutation({
    onSuccessCallback: () => {
      setModal(false);
      form.resetFields();
    },
  });

  const handleFinish = async () => {
    const values = await form.validateFields();
    const parsed = UpdateCustomerTypeSchemaPayload.safeParse({
      id: payload.id,
      ...values,
    });
    if (!parsed.success) return setZodFormErrors(parsed.error, form);
    mutate(parsed.data);
  };

  useEffect(() => {
    form.setFieldsValue({
      name: payload.name,
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
          <Button type="primary" block htmlType="submit">
            {t("form.submit")}
          </Button>
        </Form>
      </Modal>
    </div>
  );
};
