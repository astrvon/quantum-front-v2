"use client";

import { Button, Modal, Tooltip } from "antd";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { TbPencil } from "react-icons/tb";

import { ICompany } from "@/common/interfaces/data/company";

import { UpdateCompanyForm } from "../form/UpdateCompanyForm";

interface ModalUpdateCompanyParams {
  company: ICompany;
}

export const ModalUpdateCompany = ({ company }: ModalUpdateCompanyParams) => {
  const t = useTranslations("modalCompany");
  const [isModal, setModal] = useState(false);

  return (
    <div>
      <Tooltip title={t("tooltip.title")}>
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
        title={t("title")}
      >
        <UpdateCompanyForm
          onSuccess={() => setModal(false)}
          enabledFetch={isModal}
          company={company}
        />
      </Modal>
    </div>
  );
};
