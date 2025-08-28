"use client";

import { Button, Form, Input, Modal, Tooltip } from "antd";
import { useCallback, useState } from "react";
import { IoKeyOutline } from "react-icons/io5";

import useResetPasswordByClientMutation, {
  IResetPasswordByClientMutationPayload,
  ResetPasswordByClientSchemaPayload,
} from "@/common/custom/hooks/api/mutation/profile/useResetPasswordByClientMutation";
import { generateRandomPassword } from "@/common/lib/generateRandomPassword";
import { setZodFormErrors } from "@/common/lib/setZodFormErrors";

interface ModalResetPasswordParams {
  userId?: string;
}

export const ModalResetPassword = ({ userId }: ModalResetPasswordParams) => {
  const [isModal, setModal] = useState(false);
  const [form] =
    Form.useForm<Omit<IResetPasswordByClientMutationPayload, "id">>();

  const { mutate, isPending } = useResetPasswordByClientMutation({
    onSuccessCallback: () => {
      setModal(false);
      form.resetFields();
    },
  });

  const handleFinish = async () => {
    const values = await form.validateFields();
    if (!userId) return;

    const parsed = ResetPasswordByClientSchemaPayload.safeParse({
      id: userId,
      ...values,
    });

    if (!parsed.success) return setZodFormErrors(parsed.error, form);
    mutate(parsed.data);
  };

  const handleRandomPassword = useCallback(() => {
    form.setFieldValue("newPassword", generateRandomPassword());
  }, [form]);

  return (
    <>
      <Tooltip title={"Reset Password"}>
        <Button
          disabled={!userId}
          loading={isPending}
          type="default"
          onClick={() => setModal(true)}
          icon={<IoKeyOutline size={20} />}
        >
          Reset Password
        </Button>
      </Tooltip>
      <Modal
        open={isModal}
        onCancel={() => setModal(false)}
        footer={false}
        width={500}
        title={"Reset Password"}
        loading={isPending}
      >
        <Form layout="vertical" form={form} onFinish={handleFinish}>
          <Form.Item name="oldPassword" label="Old Password">
            <Input placeholder={"Enter your old password"} type="password" />
          </Form.Item>
          <Form.Item
            name="newPassword"
            label="New Password"
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
            Reset
          </Button>
        </Form>
      </Modal>
    </>
  );
};
