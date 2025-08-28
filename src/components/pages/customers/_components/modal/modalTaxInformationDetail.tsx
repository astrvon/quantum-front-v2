"use client";

import { Button, Descriptions, Flex, Modal, Space } from "antd";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { FaLandmark } from "react-icons/fa";

import useGetTaxByCustomerIDFetch from "@/common/custom/hooks/api/fetcher/tax/useGetTaxFetch";
import { ICustomer } from "@/common/interfaces/data/customer";

import { ModalUpdateTax } from "./modalUpdateTax";

interface ModalTaxInformationDetailProps {
  customer: ICustomer;
}

export const ModalTaxInformationDetail = ({
  customer,
}: ModalTaxInformationDetailProps) => {
  const [isModal, setIsModal] = useState<boolean>(false);
  const t = useTranslations("modalTaxInformationDetail");

  const { data: dataTax, isPending } = useGetTaxByCustomerIDFetch({
    enabled: isModal,
    params: { customerId: customer.id },
  });

  return (
    <>
      <Button
        type="default"
        onClick={() => setIsModal(true)}
        icon={<FaLandmark />}
      >
        {customer.Tax?.npwp ||
          customer.Tax?.fgPpn ||
          customer.Tax?.nppkp ||
          "-"}
      </Button>
      <Modal
        open={isModal}
        onCancel={() => {
          setIsModal(false);
        }}
        footer={false}
        width={600}
        loading={isPending}
        title={t("title")}
      >
        <Space direction="vertical" size={16} style={{ width: "100%" }}>
          <Descriptions bordered size="small">
            <Descriptions.Item label={t("description.npwp")} span={3}>
              {dataTax?.data?.npwp || "-"}
            </Descriptions.Item>
            <Descriptions.Item label={t("description.fgPpn")} span={3}>
              {dataTax?.data?.fgPpn || "-"}
            </Descriptions.Item>
            <Descriptions.Item label={t("description.nppkp")} span={3}>
              {dataTax?.data?.nppkp || "-"}
            </Descriptions.Item>
          </Descriptions>
          <Flex justify="end">
            <ModalUpdateTax customerId={customer.id} dataTax={dataTax?.data} />
          </Flex>
        </Space>
      </Modal>
    </>
  );
};
