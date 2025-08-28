"use client";

import { Button, Form, Input, InputNumber } from "antd";
import { useTranslations } from "next-intl";
import React, { useEffect } from "react";

import useUpdateVesselTypeMutation, {
  IUpdateVesselTypeMutationPayload,
  VesselTypeUpdateSchemaPayload,
} from "@/common/custom/hooks/api/mutation/vessel-type/useUpdateVesselTypeMutation";
import { IVesselType } from "@/common/interfaces/data/vesselType";
import { setZodFormErrors } from "@/common/lib/setZodFormErrors";

interface UpdateVesselTypeFormParams {
  onSuccess?: (data: Partial<IVesselType>) => void;
  vesselType: IVesselType;
}

export const UpdateVesselTypeForm = ({
  onSuccess,
  vesselType,
}: UpdateVesselTypeFormParams) => {
  const t = useTranslations("modalVesselType");
  const [form] = Form.useForm<Omit<IUpdateVesselTypeMutationPayload, "id">>();

  const { mutate, isPending } = useUpdateVesselTypeMutation({
    onSuccessCallback: (data) => {
      onSuccess?.(data);
      form.resetFields();
    },
  });

  const handleFinish = async () => {
    const values = await form.validateFields();

    const cleaned = Object.fromEntries(
      Object.entries({
        id: vesselType.id,
        ...values,
      }).filter(([_, value]) => !!value || value === "")
    );

    const parsed = VesselTypeUpdateSchemaPayload.safeParse(cleaned);
    if (!parsed.success) return setZodFormErrors(parsed.error, form);
    mutate(parsed.data);
  };

  useEffect(() => {
    form.setFieldsValue({
      name: vesselType.name,
      vesselTypeCode: vesselType.vesselTypeCode,
      description: vesselType.description,
      lastNumber: vesselType.lastNumber,
    });
  }, [form, vesselType]);

  return (
    <div>
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
        <Button type="primary" block htmlType="submit" loading={isPending}>
          {t("form.submit")}
        </Button>
      </Form>
    </div>
  );
};
