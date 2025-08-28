import { InboxOutlined } from "@ant-design/icons";
import { Button, Form, Image, UploadFile } from "antd";
import Dragger from "antd/es/upload/Dragger";
import { useTranslations } from "next-intl";
import React, { useState } from "react";

import useUpdateProfileMutation, {
  IUpdateProfileMutationPayload,
  ProfileUpdateSchemaPayload,
} from "@/common/custom/hooks/api/mutation/profile/useUpdateProfile";
import { handleUploadImageChange } from "@/common/helper/handleUploadImageChange";
import { IUser } from "@/common/interfaces/data/user";
import { setZodFormErrors } from "@/common/lib/setZodFormErrors";

export interface UploadImageFormParams {
  user?: IUser;
  onClose: () => void;
}

export default function UploadImageForm({
  user,
  onClose,
}: UploadImageFormParams) {
  const t = useTranslations("ModalUploadImage");
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [preview, setPreview] = useState<string | null>(null);
  const [form] = Form.useForm<Omit<IUpdateProfileMutationPayload, "id">>();

  const { mutate, isPending } = useUpdateProfileMutation({
    onSuccessCallback: () => {
      form.resetFields();
      setFileList([]);
      setPreview(null);
      onClose();
    },
  });

  const handleFinish = async () => {
    const values = await form.validateFields();
    values.profileImage = preview || undefined;
    if (!user?.id) return;

    const parsed = ProfileUpdateSchemaPayload.safeParse({
      id: user.id,
      ...values,
    });

    if (!parsed.success) return setZodFormErrors(parsed.error, form);
    mutate(parsed.data);
  };

  return (
    <Form layout="vertical" form={form} onFinish={handleFinish}>
      <Form.Item name="profileImage" label={t("image")}>
        <Dragger
          beforeUpload={() => false}
          fileList={fileList}
          onChange={(info) =>
            handleUploadImageChange({
              info,
              setFileList,
              setPreview,
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
              alt="preview"
              style={{
                objectFit: "cover",
                borderRadius: 8,
              }}
            />
          ) : (
            <div>
              <InboxOutlined style={{ fontSize: 40, color: "#999" }} />
              <div style={{ marginTop: 8, fontSize: 14 }}>{t("drag")}</div>
              <div style={{ fontSize: 12, color: "#666", marginTop: 4 }}>
                {t("onlyImage")}
              </div>
            </div>
          )}
        </Dragger>
      </Form.Item>

      <Button type="primary" block htmlType="submit" loading={isPending}>
        {t("submit")}
      </Button>
    </Form>
  );
}
