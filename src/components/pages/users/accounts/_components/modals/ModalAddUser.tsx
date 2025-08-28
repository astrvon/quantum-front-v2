"use client";

import { Button, Form, Input, Modal } from "antd";
import { useCallback, useState } from "react";
import { LiaUserPlusSolid } from "react-icons/lia";

import useRegisterMutation, {
  IRegisterMutationPayload,
  RegisterSchemaPayload,
} from "@/common/custom/hooks/api/mutation/auth/useRegisterMutation";
import { generateRandomPassword } from "@/common/lib/generateRandomPassword";
import { setZodFormErrors } from "@/common/lib/setZodFormErrors";

export const ModalAddUser = () => {
  const [isModal, setModal] = useState(false);
  const [form] = Form.useForm<IRegisterMutationPayload>();

  const { mutate, isPending } = useRegisterMutation({
    onSuccessCallback: () => {
      setModal(false);
      form.resetFields();
    },
  });

  const handleFinish = async () => {
    const values = await form.validateFields();
    values.email = values.email || undefined;
    const parsed = RegisterSchemaPayload.safeParse(values);
    if (!parsed.success) return setZodFormErrors(parsed.error, form);
    mutate(parsed.data);
  };

  const handleRandomPassword = useCallback(() => {
    form.setFieldValue("password", generateRandomPassword());
  }, [form]);

  return (
    <div>
      <Button
        type="primary"
        onClick={() => setModal(true)}
        loading={isPending}
        icon={<LiaUserPlusSolid size={"20"} />}
      >
        Add User
      </Button>
      <Modal
        open={isModal}
        onCancel={() => setModal(false)}
        footer={false}
        width={500}
        loading={isPending}
        title="Create New User"
      >
        <Form form={form} onFinish={handleFinish} layout="vertical">
          <Form.Item
            name="name"
            label="Name"
            rules={[{ required: true, message: "Name is required" }]}
            required={true}
          >
            <Input placeholder="name (min: 6)" />
          </Form.Item>
          <Form.Item
            name="username"
            label="Username"
            rules={[{ required: true, message: "Username is required" }]}
            required
          >
            <Input placeholder="username (min: 4)" />
          </Form.Item>
          <Form.Item
            name="email"
            label="Email"
            rules={[{ required: false }]}
            required={false}
          >
            <Input placeholder="email" />
          </Form.Item>
          <Form.Item
            name="password"
            label="Password"
            rules={[{ required: true, message: "Password is required" }]}
            required
          >
            <Input.Password
              placeholder="password (min: 8)"
              addonAfter={
                <Button type="link" size="small" onClick={handleRandomPassword}>
                  Generate
                </Button>
              }
            />
          </Form.Item>

          <Button type="primary" block htmlType="submit">
            Create User
          </Button>
        </Form>
      </Modal>
    </div>
  );
};
