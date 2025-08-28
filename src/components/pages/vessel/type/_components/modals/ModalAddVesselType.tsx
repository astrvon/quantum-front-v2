"use client";

import { PlusOutlined } from "@ant-design/icons";
import { Button, Modal } from "antd";
import { useTranslations } from "next-intl";
import { useState } from "react";

import CreateVesselTypeForm from "../form/CreateVesselTypeForm";

export const ModalAddVesselType = () => {
  const t = useTranslations("modalVesselType");
  const [isModal, setModal] = useState(false);

  return (
    <>
      <Button
        type="primary"
        icon={<PlusOutlined />}
        onClick={() => setModal(true)}
      >
        {t("tooltip.add")}
      </Button>

      <Modal
        open={isModal}
        onCancel={() => setModal(false)}
        footer={false}
        width={500}
        title={t("title.add")}
      >
        <CreateVesselTypeForm onSuccess={() => setModal(false)} />
      </Modal>
    </>
  );
};
