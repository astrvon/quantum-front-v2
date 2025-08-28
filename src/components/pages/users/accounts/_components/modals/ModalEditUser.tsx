"use client";

import { Button, Form, Input, Modal, Tooltip } from "antd";
import { useCallback, useState } from "react";
import { TbPencil } from "react-icons/tb";

import useUpdateUserMutation, {
  IUpdateUserMutationPayload,
  UserUpdateSchemaPayload,
} from "@/common/custom/hooks/api/mutation/accounts/useUpdateUserMutation";
import { IUser } from "@/common/interfaces/data/user";
import { generateRandomPassword } from "@/common/lib/generateRandomPassword";
import { setZodFormErrors } from "@/common/lib/setZodFormErrors";

interface ModalUpdateUserParams {
  payload: IUser;
}

export const ModalUpdateUser = ({ payload }: ModalUpdateUserParams) => {
  const [isModal, setModal] = useState(false);
  const [form] = Form.useForm<Omit<IUpdateUserMutationPayload, "id">>();

  const { mutate, isPending } = useUpdateUserMutation({
    onSuccessCallback: () => {
      setModal(false);
      form.resetFields();
    },
  });

  const handleFinish = async () => {
    const values = await form.validateFields();
    const parsed = UserUpdateSchemaPayload.safeParse({
      id: payload.id,
      ...values,
    });
    if (!parsed.success) return setZodFormErrors(parsed.error, form);
    mutate(parsed.data);
  };

  const handleRandomPassword = useCallback(() => {
    form.setFieldValue("password", generateRandomPassword());
  }, [form]);

  return (
    <div>
      <Tooltip title="Edit User">
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
        title={`Updating user ${payload.username}`}
      >
        <Form
          form={form}
          onFinish={handleFinish}
          layout="vertical"
          initialValues={{
            name: payload.name,
            username: payload.username,
            email: payload.email || undefined,
          }}
        >
          <Form.Item name="name" label="Name" required={false}>
            <Input placeholder="name (min: 6)" />
          </Form.Item>
          <Form.Item name="username" label="Username" required={false}>
            <Input placeholder="username (min: 4)" />
          </Form.Item>
          <Form.Item name="email" label="Email" required={false}>
            <Input placeholder="email" />
          </Form.Item>
          <Form.Item
            name="password"
            label="Password"
            rules={[{ required: false }]}
            required={false}
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
            Update User
          </Button>
        </Form>
      </Modal>
    </div>
  );
};
