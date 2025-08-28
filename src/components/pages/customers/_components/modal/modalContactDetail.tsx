"use client";

import { Button, Descriptions, Flex, Modal, Space } from "antd";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { BiSolidContact } from "react-icons/bi";

import useGetContactByUserIDFetch from "@/common/custom/hooks/api/fetcher/contact/useGetContactByCustomerIDFetch";
import { ICustomer } from "@/common/interfaces/data/customer";

import { ModalUpdateContact } from "./modalUpdateContact";

interface ModalContactDetailProps {
  customer: ICustomer;
}

export const ModalContactDetail = ({ customer }: ModalContactDetailProps) => {
  const [isModal, setIsModal] = useState<boolean>(false);
  const t = useTranslations("modalContactDetail");

  const { data: dataContact, isPending } = useGetContactByUserIDFetch({
    params: { customerId: customer.id },
    enabled: isModal,
  });

  return (
    <>
      <Button
        type="default"
        onClick={() => setIsModal(true)}
        icon={<BiSolidContact />}
      >
        {customer.Contact?.phoneNumber || "-"}
      </Button>
      <Modal
        open={isModal}
        onCancel={() => setIsModal(false)}
        footer={false}
        width={600}
        loading={isPending}
        title={t("title")}
      >
        <Space direction="vertical" size={16} style={{ width: "100%" }}>
          <Descriptions bordered size="small">
            <Descriptions.Item label={t("description.city")} span={3}>
              {dataContact?.data.city || "-"}
            </Descriptions.Item>
            <Descriptions.Item label={t("description.address1")} span={3}>
              {dataContact?.data.address1 || "-"}
            </Descriptions.Item>
            <Descriptions.Item label={t("description.address2")} span={3}>
              {dataContact?.data.address2 || "-"}
            </Descriptions.Item>
            <Descriptions.Item label={t("description.zipCode")} span={3}>
              {dataContact?.data.zipCode || "-"}
            </Descriptions.Item>
            <Descriptions.Item label={t("description.phoneNumber")} span={3}>
              {dataContact?.data.phoneNumber || "-"}
            </Descriptions.Item>
          </Descriptions>
          <Flex justify="end">
            <ModalUpdateContact customer={customer} />
          </Flex>
        </Space>
      </Modal>
    </>
  );
};
