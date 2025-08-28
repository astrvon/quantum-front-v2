"use client";

import { Button, Modal } from "antd";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { FaPlus } from "react-icons/fa";

import { FormAddUsers } from "../form/formAddUsers";

interface ModalAddUsersProps {
  customerId: string;
}

export const ModalAddUsers = ({ customerId }: ModalAddUsersProps) => {
  const [isModal, setIsModal] = useState<boolean>(false);
  const t = useTranslations("modalAddUsers");

  return (
    <>
      <Button
        type="primary"
        htmlType="button"
        onClick={() => setIsModal(true)}
        icon={<FaPlus />}
        style={{ minWidth: 32 }}
      />
      <Modal
        open={isModal}
        onCancel={() => setIsModal(false)}
        footer={false}
        width={600}
        title={t("title")}
      >
        <FormAddUsers
          customerId={customerId}
          isModal={isModal}
          setIsModal={setIsModal}
        />
      </Modal>
    </>
  );
};
