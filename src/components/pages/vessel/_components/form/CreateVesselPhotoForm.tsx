import { InboxOutlined } from "@ant-design/icons";
import {
  Button,
  Checkbox,
  Col,
  DatePicker,
  Flex,
  Form,
  Image,
  Input,
  Row,
  Upload,
  UploadFile,
} from "antd";
import { useTranslations } from "next-intl";
import React, { useState } from "react";

import useCreateVesselPhotoMutation, {
  ICreateVesselPhotoMutationPayload,
  VesselPhotoCreateSchemaPayload,
} from "@/common/custom/hooks/api/mutation/vessel/useCreateVesselPhotoMutation";
import { handleUploadImageChange } from "@/common/helper/handleUploadImageChange";
import { setZodFormErrors } from "@/common/lib/setZodFormErrors";

interface ICreateVesselPhotoFormProps {
  onClose?: () => void;
  vesselId: string;
}

const CreateVesselPhotoForm = ({
  onClose,
  vesselId,
}: ICreateVesselPhotoFormProps) => {
  const t = useTranslations("vesselPhotoModal");
  const [form] = Form.useForm<ICreateVesselPhotoMutationPayload>();
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [preview, setPreview] = useState<string | null>(null);

  const { mutate, isPending } = useCreateVesselPhotoMutation({
    onSuccessCallback: () => {
      onClose?.();
      form.resetFields();
      setFileList([]);
      setPreview(null);
    },
  });

  const handleFinish = async () => {
    const values = await form.validateFields();
    const parsed = VesselPhotoCreateSchemaPayload.safeParse({
      ...values,
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
      <Form.Item
        name="base64"
        label={t("uploadImage")}
        rules={[{ required: true, message: t("uploadRequired") }]}
      >
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
          {t("buttonAdd")}
        </Button>
      </div>
    </Form>
  );
};

export default CreateVesselPhotoForm;
