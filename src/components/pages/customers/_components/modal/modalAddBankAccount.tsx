"use client";

import { Button, Modal, Tooltip } from "antd";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { FaPlus } from "react-icons/fa";

import { FormAddBankAccount } from "../form/formAddBankAccount";

interface ModalAddBankAccountProps {
  customerId: string;
}

export const ModalAddBankAccount = ({
  customerId,
}: ModalAddBankAccountProps) => {
  const [isModal, setIsModal] = useState<boolean>(false);
  const t = useTranslations("modalAddBankAccount");

  return (
    <>
      <Tooltip title={t("tooltip.title")}>
        <Button
          type="primary"
          onClick={() => setIsModal(true)}
          icon={<FaPlus />}
          loading={false}
        />
      </Tooltip>
      <Modal
        title={t("title")}
        open={isModal}
        onCancel={() => setIsModal(false)}
        width={600}
        footer={null}
      >
        <FormAddBankAccount
          customerId={customerId}
          isModal={isModal}
          setIsModal={setIsModal}
        />
      </Modal>
    </>
  );
};
