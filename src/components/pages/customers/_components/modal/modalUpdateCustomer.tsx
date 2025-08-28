"use client";

import { Button, Modal, Tooltip } from "antd";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { FaPencilAlt } from "react-icons/fa";

import { ICustomer } from "@/common/interfaces/data/customer";

import { FormUpdateCustomer } from "../form/formUpdateCustomer";

interface ModalUpdateCustomerProps {
  customer: ICustomer;
}

export const ModalUpdateCustomer = ({ customer }: ModalUpdateCustomerProps) => {
  const [isModal, setIsModal] = useState<boolean>(false);
  const t = useTranslations("modalUpdateCustomer");

  return (
    <>
      <Tooltip title={t("tooltip")}>
        <Button
          icon={<FaPencilAlt />}
          onClick={() => setIsModal(true)}
          type="primary"
          ghost
        />
      </Tooltip>
      <Modal
        open={isModal}
        onCancel={() => setIsModal(false)}
        footer={false}
        width={600}
        title={t("title")}
      >
        <FormUpdateCustomer
          customer={customer}
          isModal={isModal}
          setIsModal={setIsModal}
        />
      </Modal>
    </>
  );
};
