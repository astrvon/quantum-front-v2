import { Button, Modal, Tooltip } from "antd";
import { useTranslations } from "next-intl";
import React, { useState } from "react";
import { TbPencil } from "react-icons/tb";

import { IVesselType } from "@/common/interfaces/data/vesselType";

import { UpdateVesselTypeForm } from "../form/UpdateVesselTypeForm";

interface ModalUpdateVesselTypeParams {
  vesselType: IVesselType;
}

const ModalUpdateVesselType = ({ vesselType }: ModalUpdateVesselTypeParams) => {
  const t = useTranslations("modalVesselType");
  const [isModal, setModal] = useState(false);

  return (
    <div>
      <Tooltip title={t("tooltip.update")}>
        <Button
          ghost
          type="primary"
          onClick={() => setModal(true)}
          icon={<TbPencil size={"20"} />}
        />
      </Tooltip>

      <Modal
        open={isModal}
        onCancel={() => setModal(false)}
        footer={false}
        width={500}
        title={t("title.update")}
      >
        <UpdateVesselTypeForm
          onSuccess={() => setModal(false)}
          vesselType={vesselType}
        />
      </Modal>
    </div>
  );
};

export default ModalUpdateVesselType;
