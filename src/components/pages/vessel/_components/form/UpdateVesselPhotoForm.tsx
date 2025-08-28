import { InboxOutlined } from "@ant-design/icons";
import {
  Form,
  Upload,
  Flex,
  Input,
  DatePicker,
  Row,
  Col,
  Checkbox,
  Button,
  Image,
  UploadFile,
} from "antd";
import dayjs from "dayjs";
import { useTranslations } from "next-intl";
import React, { useEffect, useState } from "react";

import useUpdateVesselPhotoMutation, {
  IUpdateVesselPhotoMutationPayload,
  VesselPhotoUpdateSchemaPayload,
} from "@/common/custom/hooks/api/mutation/vessel/useUpdateVesselPhotoMutation";
import { handleUploadImageChange } from "@/common/helper/handleUploadImageChange";
import { IRefVesselPhoto } from "@/common/interfaces/data/vesselPhoto";
import { setZodFormErrors } from "@/common/lib/setZodFormErrors";

interface IUpdateVesselPhotoFormProps {
  onClose: () => void;
  vesselId: string;
  vesselPhoto?: IRefVesselPhoto;
}

export default function UpdateVesselPhotoForm({
  onClose,
  vesselId,
  vesselPhoto,
}: Readonly<IUpdateVesselPhotoFormProps>) {
  const t = useTranslations("vesselPhotoModal");
  const [form] = Form.useForm<IUpdateVesselPhotoMutationPayload>();
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [preview, setPreview] = useState<string | null>(null);

  const { mutate, isPending } = useUpdateVesselPhotoMutation({
    onSuccessCallback: () => {
      onClose();
      form.resetFields();
      setFileList([]);
      setPreview(null);
    },
  });

  useEffect(() => {
    form.setFieldsValue({
      name: vesselPhoto?.name,
      description: vesselPhoto?.description,
      isPanorama: vesselPhoto?.isPanorama,
      isCover: vesselPhoto?.isCover,
      takenAt: vesselPhoto?.takenAt ? dayjs(vesselPhoto.takenAt) : undefined,
      base64: vesselPhoto?.base64,
      id: vesselPhoto?.id,
    });
    setPreview(vesselPhoto?.base64 || null);
  }, [vesselPhoto, form]);

  const handleFinish = async () => {
    const values = await form.validateFields();

    const parsed = VesselPhotoUpdateSchemaPayload.safeParse({
      ...values,
      id: vesselPhoto?.id,
      vesselId,
    });

    if (!parsed.success) return setZodFormErrors(parsed.error, form);
    mutate(parsed.data);
  };

  return (
    <Form
      form={form}
      onFinish={handleFinish}
      layout="vertical"
      autoComplete="off"
    >
      <Form.Item name="base64" label={t("uploadImageBase64")}>
        <Upload.Dragger
          beforeUpload={() => false}
          fileList={fileList}
          onChange={(info) =>
            handleUploadImageChange({
              info,
              setFileList,
              setPreview: (val) => {
                setPreview(val);
                form.setFieldValue("base64", val);
              },
            })
          }
          maxCount={1}
          accept="image/*"
          showUploadList={false}
          style={{
            padding: 12,
            border: "1px dashed #d9d9d9",
            borderRadius: 8,
            backgroundColor: "#fafafa",
            textAlign: "center",
          }}
        >
          {preview ? (
            <Image
              src={preview}
              preview={false}
              alt="preview"
              style={{
                objectFit: "cover",
                borderRadius: 8,
                maxHeight: 200,
              }}
            />
          ) : (
            <div>
              <InboxOutlined style={{ fontSize: 40, color: "#999" }} />
              <div style={{ marginTop: 8, fontSize: 14 }}>
                {t("uploadPlaceholder")}
              </div>
              <div style={{ fontSize: 12, color: "#666", marginTop: 4 }}>
                {t("uploadNote")}
              </div>
            </div>
          )}
        </Upload.Dragger>
      </Form.Item>

      <Flex gap={6}>
        <Form.Item
          style={{ flex: 2 }}
          name="name"
          label={t("fieldName")}
          rules={[{ required: true, message: t("fieldNameRequired") }]}
        >
          <Input placeholder={t("fieldNamePlaceholder")} />
        </Form.Item>

        <Form.Item style={{ flex: 1 }} name="takenAt" label={t("fieldTakenAt")}>
          <DatePicker style={{ width: "100%" }} format="YYYY-MM-DD" />
        </Form.Item>
      </Flex>

      <Form.Item name="description" label={t("fieldDescription")}>
        <Input.TextArea
          placeholder={t("fieldDescriptionPlaceholder")}
          rows={3}
        />
      </Form.Item>

      <Row gutter={16}>
        <Col span={12}>
          <Form.Item name="isPanorama" valuePropName="checked">
            <Checkbox>{t("checkboxPanorama")}</Checkbox>
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item name="isCover" valuePropName="checked">
            <Checkbox>{t("checkboxCover")}</Checkbox>
          </Form.Item>
        </Col>
      </Row>

      <div style={{ marginTop: 16 }}>
        <Button type="primary" block htmlType="submit" loading={isPending}>
          {t("buttonUpdate")}
        </Button>
      </div>
    </Form>
  );
}
