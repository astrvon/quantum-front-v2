"use client";

import { Button, Modal, Tooltip } from "antd";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { FaPencilAlt, FaPlus } from "react-icons/fa";

import { ITax } from "@/common/interfaces/data/tax";

import { FormUpdateTax } from "../form/formUpdateTax";

interface ModalUpdateTaxProps {
  customerId: string;
  dataTax: ITax | undefined;
}

export const ModalUpdateTax = ({
  customerId,
  dataTax,
}: ModalUpdateTaxProps) => {
  const [isModal, setIsModal] = useState<boolean>(false);
  const t = useTranslations("modalUpdateTaxInformation");

  return (
    <>
      <Tooltip title={dataTax?.id ? t("tooltip.update") : t("tooltip.add")}>
        <Button
          icon={dataTax?.id ? <FaPencilAlt /> : <FaPlus />}
          onClick={() => setIsModal(true)}
          type="primary"
          ghost
        />
      </Tooltip>
      <Modal
        open={isModal}
        onCancel={() => {
          setIsModal(false);
        }}
        footer={false}
        width={600}
        title={dataTax?.id ? t("title.update") : t("title.add")}
      >
        <FormUpdateTax
          customerId={customerId}
          data={dataTax}
          isModal={isModal}
          setIsModal={setIsModal}
        />
      </Modal>
    </>
  );
};
