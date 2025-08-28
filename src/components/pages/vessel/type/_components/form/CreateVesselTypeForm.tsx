import { Button, Form, Input, InputNumber } from "antd";
import { useTranslations } from "next-intl";
import React from "react";

import useCreateVesselTypeMutation, {
  ICreateVesselTypeMutationPayload,
  VesselTypeCreateSchemaPayload,
} from "@/common/custom/hooks/api/mutation/vessel-type/useCreateVesselTypeMutation";
import { IVesselType } from "@/common/interfaces/data/vesselType";
import { setZodFormErrors } from "@/common/lib/setZodFormErrors";

export interface CreateVesselTypeFormProps {
  onSuccess?: (data: Partial<IVesselType>) => void;
}

const CreateVesselTypeForm = ({ onSuccess }: CreateVesselTypeFormProps) => {
  const t = useTranslations("modalVesselType");
  const [form] = Form.useForm<ICreateVesselTypeMutationPayload>();

  const { mutate } = useCreateVesselTypeMutation({
    onSuccessCallback: (data) => {
      onSuccess?.(data);
      form.resetFields();
    },
  });

  const handleFinish = async () => {
    const values = await form.validateFields();
    const parsed = VesselTypeCreateSchemaPayload.safeParse(values);
    if (!parsed.success) return setZodFormErrors(parsed.error, form);
    mutate(parsed.data);
  };

  return (
    <Form form={form} onFinish={handleFinish} layout="vertical">
      <Form.Item
        name="name"
        label={t("form.name.label")}
        rules={[{ required: true, message: t("form.name.required") }]}
        required
      >
        <Input placeholder={t("form.name.placeholder")} />
      </Form.Item>

      <Form.Item name="vesselTypeCode" label={t("form.vesselTypeCode.label")}>
        <Input placeholder={t("form.vesselTypeCode.placeholder")} />
      </Form.Item>

      <Form.Item name="description" label={t("form.description.label")}>
        <Input.TextArea placeholder={t("form.description.placeholder")} />
      </Form.Item>

      <Form.Item name="lastNumber" label={t("form.lastNumber.label")}>
        <InputNumber
          placeholder={t("form.lastNumber.placeholder")}
          style={{ width: "100%" }}
        />
      </Form.Item>

      <Button type="primary" block htmlType="submit">
        {t("form.submit")}
      </Button>
    </Form>
  );
};

export default CreateVesselTypeForm;
