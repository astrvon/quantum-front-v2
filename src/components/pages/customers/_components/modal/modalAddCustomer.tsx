"use client";

import { Button, Modal } from "antd";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { FaUser } from "react-icons/fa";

import { FormAddCustomer } from "../form/formAddCustomer";

export const ModalAddCustomer = () => {
  const [isModal, setIsModal] = useState<boolean>(false);
  const t = useTranslations("modalAddCustomer");

  return (
    <>
      <Button type="primary" onClick={() => setIsModal(true)} icon={<FaUser />}>
        {t("button")}
      </Button>

      <Modal
        title={t("title")}
        open={isModal}
        onCancel={() => setIsModal(false)}
        width={600}
        footer={null}
      >
        <FormAddCustomer isModal={isModal} setIsModal={setIsModal} />
      </Modal>
    </>
  );
};
