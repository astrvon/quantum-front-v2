"use client";

import { MailOutlined, UserOutlined } from "@ant-design/icons";
import {
  Typography,
  Descriptions,
  Flex,
  Avatar,
  Tooltip,
  Form,
  Input,
  Button,
  Card,
} from "antd";
import { useTranslations } from "next-intl";
import React, { HTMLAttributes, useState } from "react";
import { LuAtSign } from "react-icons/lu";
import { TbPencil } from "react-icons/tb";

import useProfileFetch from "@/common/custom/hooks/api/fetcher/useProfileFetch";
import useUpdateProfileMutation, {
  IUpdateProfileMutationPayload,
  ProfileUpdateSchemaPayload,
} from "@/common/custom/hooks/api/mutation/profile/useUpdateProfile";
import { setZodFormErrors } from "@/common/lib/setZodFormErrors";

import { ModalUploadImage } from "./_components/modal/ModalUploadImage";
import { ModalResetPassword } from "./_components/ModalResetPassword";

const { Title } = Typography;

const cardStyle: HTMLAttributes<HTMLDivElement>["style"] = {
  boxShadow: "none",
  borderRadius: 8,
  border: "1px solid #f0f0f0",
};

export const ProfilePage = () => {
  const { data } = useProfileFetch();
  const profile = data?.data;
  const [isModalUploadOpen, setModalUploadOpen] = useState(false);
  const [form] = Form.useForm<Omit<IUpdateProfileMutationPayload, "id">>();
  const [isEditing, setIsEditing] = useState(false);

  const { mutate, isPending } = useUpdateProfileMutation({
    onSuccessCallback: () => {
      form.resetFields();
      setIsEditing(false);
    },
  });

  const t = useTranslations("ProfilePage");

  const handleFinish = async () => {
    const values = await form.validateFields();
    if (!profile?.id) return;

    const parsed = ProfileUpdateSchemaPayload.safeParse({
      id: profile.id,
      ...values,
    });

    if (!parsed.success) return setZodFormErrors(parsed.error, form);
    mutate(parsed.data);
  };

  return (
    <Flex vertical gap={32} style={{ minWidth: 600 }}>
      <Flex align="center" justify="space-between">
        <Flex align="center" gap={16}>
          <Tooltip title="Click to change photo">
            <div
              onClick={() => setModalUploadOpen(true)}
              style={{ cursor: "pointer" }}
            >
              <Avatar
                size={96}
                src={profile?.profileImage}
                icon={<UserOutlined />}
                style={{ border: "1px solid #d9d9d9" }}
              />
            </div>
          </Tooltip>
          <Flex vertical>
            <Title level={3} style={{ margin: 0 }}>
              {profile?.name}
            </Title>
            <Flex gap={12} align="center">
              <span style={{ color: "#888", fontSize: 18 }}>
                @{profile?.username}
              </span>
            </Flex>
          </Flex>
        </Flex>
        <Flex vertical gap={6}>
          <ModalResetPassword userId={profile?.id} />
        </Flex>
      </Flex>

      <Form form={form} layout="vertical">
        <Card style={cardStyle}>
          <Title level={4} style={{ marginBottom: 24 }}>
            {t("biodata") || "Biodata"}
          </Title>
          <Descriptions
            column={2}
            layout="vertical"
            styles={{
              label: { fontWeight: 600, fontSize: 16 },
              content: { fontSize: 16 },
            }}
          >
            <Descriptions.Item label={t("name")}>
              <Flex align="center" gap={8}>
                <UserOutlined />
                {isEditing ? (
                  <Form.Item name="name" style={{ margin: 0 }}>
                    <Input placeholder={t("name")} style={{ fontSize: 16 }} />
                  </Form.Item>
                ) : (
                  <span>{profile?.name || "-"}</span>
                )}
              </Flex>
            </Descriptions.Item>
            <Descriptions.Item label={t("email")}>
              <Flex align="center" gap={8}>
                <MailOutlined />
                {isEditing ? (
                  <Form.Item name="email" style={{ margin: 0 }}>
                    <Input placeholder={t("email")} style={{ fontSize: 16 }} />
                  </Form.Item>
                ) : (
                  <span>{profile?.email || "-"}</span>
                )}
              </Flex>
            </Descriptions.Item>
            <Descriptions.Item label={t("username")}>
              <Flex align="center" gap={8}>
                <LuAtSign />
                <span>{profile?.username || "-"}</span>
              </Flex>
            </Descriptions.Item>
          </Descriptions>
          <Flex justify="end" style={{ marginTop: 24 }}>
            {isEditing ? (
              <Button type="primary" onClick={handleFinish} loading={isPending}>
                {t("save")}
              </Button>
            ) : (
              <Button
                onClick={() => {
                  setIsEditing(true);
                  form.setFieldsValue({
                    name: profile?.name,
                    email: profile?.email,
                  });
                }}
              >
                <TbPencil />
                {t("edit")}
              </Button>
            )}
          </Flex>
        </Card>
      </Form>

      <ModalUploadImage
        user={profile}
        isOpen={isModalUploadOpen}
        onClose={() => setModalUploadOpen(false)}
      />
    </Flex>
  );
};
