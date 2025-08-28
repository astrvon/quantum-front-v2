import { Button, Modal, Tooltip } from "antd";
import { useTranslations } from "next-intl";
import React, { useState } from "react";
import { TbPencil } from "react-icons/tb";

import { IRefVessel } from "@/common/interfaces/data/vessel";

import UpdateVesselForm from "../form/UpdateVesselForm";

interface ModalUpdateVesselParams {
  vessel: IRefVessel;
}

const ModalUpdateVessel = ({ vessel }: ModalUpdateVesselParams) => {
  const t = useTranslations("modalVessel");
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
        width={800}
        title={t("title.update")}
      >
        <UpdateVesselForm
          onSuccess={() => setModal(false)}
          enabledFetch={isModal}
          vessel={vessel}
        />
      </Modal>
    </div>
  );
};

export default ModalUpdateVessel;
