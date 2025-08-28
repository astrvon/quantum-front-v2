import { Button, Modal, Tooltip, Typography, Space, Flex } from "antd";
import { useState } from "react";
import { IoKeyOutline } from "react-icons/io5";

import useGenerateResetPasswordUrlMutation from "@/common/custom/hooks/api/mutation/users/useGenerateResetPasswordUrlMutation";

const { Paragraph } = Typography;

interface ModalShowResetPasswordUrlProps {
  id: string;
}

export const ModalShowResetPasswordUrl = ({
  id,
}: ModalShowResetPasswordUrlProps) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [url, setUrl] = useState<string>();

  const { mutate, isPending } = useGenerateResetPasswordUrlMutation({
    onSuccessCallback: (r) => {
      setUrl(r.url);
      setModalOpen(true);
    },
  });

  return (
    <Space>
      <Tooltip title="Generate URL Reset Password">
        <Button
          ghost
          type="primary"
          icon={<IoKeyOutline />}
          loading={isPending}
          onClick={() => mutate({ id })}
        />
      </Tooltip>

      <Modal
        open={isModalOpen}
        onCancel={() => setModalOpen(false)}
        footer={null}
        title="Generate URL Reset Password"
        width={500}
      >
        <Flex
          style={{
            border: "1px solid #d9d9d9",
            borderRadius: "10px",
            background: "#fafafa",
            padding: "8px 12px",
            alignItems: "center",
            overflow: "hidden",
          }}
        >
          <Paragraph
            copyable={{ text: url }}
            ellipsis
            style={{
              margin: 0,
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
              maxWidth: "100%",
            }}
          >
            {url}
          </Paragraph>
        </Flex>
      </Modal>
    </Space>
  );
};
