"use client";

import {
  Modal,
} from "antd";
import { useTranslations } from "next-intl";

import { IRefVesselPhoto } from "@/common/interfaces/data/vesselPhoto";

import UpdateVesselPhotoForm from "../form/UpdateVesselPhotoForm";

interface IModalUpdateVesselPhotoProps {
  open: boolean;
  onClose: () => void;
  vesselId: string;
  vesselPhoto?: IRefVesselPhoto;
}

export const ModalUpdateVesselPhoto = ({
  open,
  onClose,
  vesselId,
  vesselPhoto,
}: IModalUpdateVesselPhotoProps) => {
  const t = useTranslations("vesselPhotoModal");

  return (
    <Modal
      open={open}
      onCancel={onClose}
      footer={false}
      width={500}
      title={t("updateTitle")}
      zIndex={2000}
      destroyOnHidden
    >
      <UpdateVesselPhotoForm
        onClose={onClose}
        vesselId={vesselId}
        vesselPhoto={vesselPhoto}
      />
    </Modal>
  );
};
