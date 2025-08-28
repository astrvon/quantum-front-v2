import { Modal } from "antd";
import { useTranslations } from "next-intl";

import { IUser } from "@/common/interfaces/data/user";

import UploadImageForm from "../form/UploadImageForm";

export interface ModalUploadImageParams {
  user?: IUser;
  isOpen: boolean;
  onClose: () => void;
}

export const ModalUploadImage = ({
  user,
  isOpen,
  onClose,
}: ModalUploadImageParams) => {
  const t = useTranslations("ModalUploadImage");

  return (
    <Modal
      open={isOpen}
      onCancel={onClose}
      footer={false}
      width={500}
      title={t("title")}
      destroyOnHidden
    >
      <UploadImageForm user={user} onClose={onClose} />
    </Modal>
  );
};
