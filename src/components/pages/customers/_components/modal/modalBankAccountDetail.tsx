"use client";

import { CheckCircleFilled, CloseCircleFilled } from "@ant-design/icons";
import {
  Button,
  Card,
  Descriptions,
  Divider,
  Empty,
  Flex,
  Input,
  Modal,
  Popconfirm,
  Space,
  Tag,
  Tooltip,
} from "antd";
import { useTranslations } from "next-intl";
import { useCallback, useState } from "react";
import { FaCreditCard, FaTrash } from "react-icons/fa";
import {
  MdOutlineCheckCircleOutline,
  MdOutlineRemoveCircleOutline,
} from "react-icons/md";

import useGetListBankAccountFetch from "@/common/custom/hooks/api/fetcher/bank-account/useGetListBankAccountFetch";
import useDeleteBankAccountMutation from "@/common/custom/hooks/api/mutation/bank-account/useDeleteBankAccountMutation";
import useUpdateBankAccountMutation from "@/common/custom/hooks/api/mutation/bank-account/useUpdateBankAccountMutation";
import { useDebounce } from "@/common/custom/hooks/share/useDebounce";
import { IBankAccount } from "@/common/interfaces/data/bankAccount";
import { BankAccountCategoryEnum } from "@/common/interfaces/enum/bankAccountCategory";
import { DEFAULT_PAGINATION } from "@/common/var/pagination";

import { ModalAddBankAccount } from "./modalAddBankAccount";
import { ModalUpdateBankAccount } from "./modalUpdateBankAccount";

interface ModalBankAccountDetailProps {
  customerId: string;
  totalAccounts: number;
}

export const ModalBankAccountDetail = ({
  customerId,
  totalAccounts,
}: ModalBankAccountDetailProps) => {
  const [isModal, setIsModal] = useState<boolean>(false);
  const [pagination] = useState(DEFAULT_PAGINATION);
  const [search, setSearch] = useState<string | undefined>(undefined);
  const searchDebounce = useDebounce(search);
  const t = useTranslations("modalBankAccountDetail");

  const { data: dataBankAccount, isPending } = useGetListBankAccountFetch({
    params: {
      customerId,
      pagination: { ...pagination, search: searchDebounce },
    },
    enabled: isModal,
  });

  const { mutate: mutateUpdateStatus, isPending: isUpdateStatusPending } =
    useUpdateBankAccountMutation();

  const updateBankAccountStatus = useCallback(
    (r: IBankAccount) => {
      mutateUpdateStatus({
        id: r.id,
        isActive: !r.isActive,
        customerId: r.customerId,
        category: BankAccountCategoryEnum.CUSTOMER,
      });
    },
    [mutateUpdateStatus]
  );

  const { mutate: mutateDelete, isPending: isDeletePending } =
    useDeleteBankAccountMutation();

  const handleConfirmDelete = (id: string) => {
    mutateDelete({
      ids: [id],
      category: BankAccountCategoryEnum.CUSTOMER,
      customerId,
    });
  };

  return (
    <>
      <Button
        type="default"
        onClick={() => setIsModal(true)}
        icon={<FaCreditCard />}
      >
        {totalAccounts}
      </Button>
      <Modal
        open={isModal}
        onCancel={() => setIsModal(false)}
        footer={
          <Flex justify="end">
            <ModalAddBankAccount customerId={customerId} />
          </Flex>
        }
        width={600}
        title={t("title")}
      >
        <Space
          direction="vertical"
          size={16}
          style={{
            width: "100%",
            maxHeight: "65vh",
            height: "fit-content",
            overflowY: "auto",
            scrollbarWidth: "none",
            msOverflowStyle: "none",
          }}
          className="hide-scrollbar"
        >
          <Flex>
            <Input.Search
              placeholder={t("search")}
              onChange={(e) => setSearch(e.target.value)}
            />
          </Flex>

          {dataBankAccount?.data.length ? (
            dataBankAccount.data.map((r, i) => (
              <Card
                key={i}
                title={r.BankType.name}
                extra={<ModalUpdateBankAccount data={r} />}
                loading={isPending}
              >
                <Descriptions>
                  <Descriptions.Item
                    label={t("description.holderName")}
                    span={24}
                  >
                    {r.holderName}
                  </Descriptions.Item>
                  <Descriptions.Item
                    label={t("description.accountNumber")}
                    span={24}
                  >
                    {r.accountNumber}
                  </Descriptions.Item>
                  <Descriptions.Item
                    label={t("description.status.label")}
                    span={24}
                  >
                    <Tag
                      color={r.isActive ? "success" : "error"}
                      icon={
                        r.isActive ? (
                          <CheckCircleFilled />
                        ) : (
                          <CloseCircleFilled />
                        )
                      }
                    >
                      {r.isActive
                        ? t("description.status.data.active")
                        : t("description.status.data.inactive")}
                    </Tag>
                  </Descriptions.Item>
                </Descriptions>
                <Divider />
                <Flex justify="end" gap={8}>
                  <Tooltip
                    title={
                      r.isActive
                        ? t("tooltip.status.inactive")
                        : t("tooltip.status.active")
                    }
                  >
                    <Button
                      icon={
                        r.isActive ? (
                          <MdOutlineRemoveCircleOutline />
                        ) : (
                          <MdOutlineCheckCircleOutline />
                        )
                      }
                      htmlType="button"
                      onClick={() => updateBankAccountStatus(r)}
                      loading={isUpdateStatusPending || isDeletePending}
                    />
                  </Tooltip>
                  <Tooltip title={t("tooltip.delete")}>
                    <Popconfirm
                      title={t("popconfirm.title")}
                      description={t("popconfirm.description")}
                      onConfirm={() => handleConfirmDelete(r.id)}
                      okText={t("popconfirm.ok")}
                      cancelText={t("popconfirm.cancel")}
                      okButtonProps={{ danger: true }}
                      placement="top"
                    >
                      <Button
                        icon={<FaTrash />}
                        danger
                        htmlType="button"
                        loading={isUpdateStatusPending || isDeletePending}
                      />
                    </Popconfirm>
                  </Tooltip>
                </Flex>
              </Card>
            ))
          ) : (
            <Card loading={isPending}>
              <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
            </Card>
          )}
        </Space>
      </Modal>
    </>
  );
};
