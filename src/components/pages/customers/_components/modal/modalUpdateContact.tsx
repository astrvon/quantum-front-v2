"use client";

import { Button, Modal } from "antd";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { FaPencilAlt } from "react-icons/fa";

import { ICustomer } from "@/common/interfaces/data/customer";

import { FormUpdateContact } from "../form/formUpdateContact";

interface ModalUpdateContactProps {
  customer: ICustomer;
}

export const ModalUpdateContact = ({ customer }: ModalUpdateContactProps) => {
  const [isModal, setIsModal] = useState<boolean>(false);
  const t = useTranslations("modalUpdateContact");

  return (
    <>
      <Button
        icon={<FaPencilAlt />}
        onClick={() => setIsModal(true)}
        type="primary"
        ghost
      />
      <Modal
        open={isModal}
        onCancel={() => setIsModal(false)}
        footer={false}
        width={600}
        title={t("title")}
      >
        <FormUpdateContact
          customer={customer}
          isModal={isModal}
          setIsModal={setIsModal}
        />
      </Modal>
    </>
  );
};
