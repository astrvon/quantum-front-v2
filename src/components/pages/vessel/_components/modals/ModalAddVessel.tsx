"use client";

import { PlusOutlined } from "@ant-design/icons";
import { Button, Modal } from "antd";
import { useTranslations } from "next-intl";
import { useState } from "react";

import CreateVesselForm from "../form/CreateVesselForm";

export const ModalAddVessel = () => {
  const t = useTranslations("modalVessel");
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
        width={800}
        title={t("title.add")}
      >
        <CreateVesselForm
          onSuccess={() => setModal(false)}
          enabledFetch={isModal}
        />
      </Modal>
    </>
  );
};
