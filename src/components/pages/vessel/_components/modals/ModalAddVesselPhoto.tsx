"use client";

import {
  Modal,
} from "antd";
import { useTranslations } from "next-intl";

import CreateVesselPhotoForm from "../form/CreateVesselPhotoForm";

interface IModalAddVesselPhotoProps {
  open: boolean;
  onClose: () => void;
  vesselId: string;
}

export const ModalAddVesselPhoto = ({
  open,
  onClose,
  vesselId,
}: IModalAddVesselPhotoProps) => {
  const t = useTranslations("vesselPhotoModal");

  return (
    <Modal
      open={open}
      onCancel={onClose}
      footer={false}
      width={500}
      title={t("addTitle")}
      zIndex={2000}
    >
      <CreateVesselPhotoForm onClose={onClose} vesselId={vesselId} />
    </Modal>
  );
};
