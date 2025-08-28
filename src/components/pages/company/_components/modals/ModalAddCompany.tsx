"use client";

import { PlusOutlined } from "@ant-design/icons";
import { Button, Modal } from "antd";
import { useTranslations } from "next-intl";
import { useState } from "react";

import AddCompanyForm from "../form/AddCompanyForm";

export const ModalAddCompany = () => {
  const t = useTranslations("modalCompany");
  const [isModal, setModal] = useState(false);

  return (
    <>
      <Button
        type="primary"
        onClick={() => setModal(true)}
        icon={<PlusOutlined size={20} />}
      >
        {t("button.add")}
      </Button>

      <Modal
        open={isModal}
        onCancel={() => setModal(false)}
        footer={false}
        width={800}
        title={t("title")}
      >
        <AddCompanyForm onSuccess={() => setModal(false)} enabledFetch={isModal}  />
      </Modal>
    </>
  );
};
