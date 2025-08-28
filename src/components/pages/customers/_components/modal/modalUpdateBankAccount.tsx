"use client";

import { Button, Modal } from "antd";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { FaPencilAlt } from "react-icons/fa";

import { IBankAccount } from "@/common/interfaces/data/bankAccount";

import { FormUpdateBankAccount } from "../form/formUpdateBankAccount";

interface ModalUpdateBankAccountProps {
  data: IBankAccount;
}

export const ModalUpdateBankAccount = ({
  data,
}: ModalUpdateBankAccountProps) => {
  const [isModal, setIsModal] = useState<boolean>(false);
  const t = useTranslations("modalUpdateBankAccount");

  return (
    <>
      <Button
        type="primary"
        htmlType="button"
        onClick={() => setIsModal(true)}
        ghost
        icon={<FaPencilAlt />}
      />
      <Modal
        open={isModal}
        onCancel={() => setIsModal(false)}
        footer={false}
        width={500}
        title={t("title")}
      >
        <FormUpdateBankAccount
          data={data}
          isModal={isModal}
          setIsModal={setIsModal}
        />
      </Modal>
    </>
  );
};
