"use client";

import {
  CheckCircleFilled,
  CloseCircleFilled,
  DeleteOutlined,
} from "@ant-design/icons";
import { Button, Flex, Input, Popconfirm, Table, Tag, Tooltip } from "antd";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { TbCircleCheck, TbForbid2 } from "react-icons/tb";

import useGetListBankTypeFetch from "@/common/custom/hooks/api/fetcher/bank-type/useGetListBankTypeFetch";
import useDeleteBankTypeMutation from "@/common/custom/hooks/api/mutation/bank-type/useDeleteBankTypeMutation";
import useUpdateBankTypeMutation from "@/common/custom/hooks/api/mutation/bank-type/useUpdateBankTypeMutation";
import { useDebounce } from "@/common/custom/hooks/share/useDebounce";
import { ParseTableNumber } from "@/common/helper/parseTableNumber";
import { IBankType } from "@/common/interfaces/data/bankType";
import { formatDate } from "@/common/lib/dayjsDateFormat";
import { DEFAULT_PAGINATION } from "@/common/var/pagination";

import { ModalAddBankType } from "./_components/modals/ModalAddBankType";
import { ModalUpdateBankType } from "./_components/modals/ModalUpdateBankType";

export const BankTypePage = () => {
  const t = useTranslations("bankTypePage");

  const [pagination, setPagination] = useState(DEFAULT_PAGINATION);
  const [search, setSearch] = useState<string | undefined>(undefined);
  const searchDebounce = useDebounce(search);

  const { mutate: mutateDelete, isPending: isLoadingDelete } =
    useDeleteBankTypeMutation();
  const { mutate: mutateUpdate } = useUpdateBankTypeMutation();

  const { data, isLoading } = useGetListBankTypeFetch({
    params: {
      pagination: {
        ...pagination,
        search: searchDebounce,
      },
    },
    enabled: true,
  });

  return (
    <Flex style={{ flexDirection: "column", gap: 10 }}>
      <h1>{t("title")}</h1>

      <Flex gap={10}>
        <Input.Search
          placeholder={t("searchPlaceholder")}
          onChange={(e) => setSearch(e.target.value)}
        />
        <ModalAddBankType />
      </Flex>

      <Table
        dataSource={data?.data}
        loading={isLoading || isLoadingDelete}
        rowKey="id"
        pagination={{
          current: pagination.page,
          pageSize: pagination.take,
          defaultPageSize: DEFAULT_PAGINATION.take,
          pageSizeOptions: [10, 25, 50],
          showSizeChanger: true,
          onChange: (page, pageSize) => {
            setPagination((prev) => ({ ...prev, page, take: pageSize }));
          },
          total: data?.meta?.total,
        }}
        onChange={(p) =>
          setPagination((prev) => ({ ...prev, page: p.current }))
        }
        scroll={{ x: true }}
      >
        <Table.Column
          title={t("columns.no")}
          render={(_v, _r, i) => ParseTableNumber(i, pagination)}
        />
        <Table.Column title={t("columns.name")} dataIndex="name" key="name" />
        <Table.Column
          title={t("columns.bankCode")}
          dataIndex="bankCode"
          key="bankCode"
        />
        <Table.Column
          title={t("columns.status")}
          key="isActive"
          dataIndex="isActive"
          render={(status: boolean) => (
            <Tag
              icon={status ? <CheckCircleFilled /> : <CloseCircleFilled />}
              color={status ? "success" : "error"}
              style={{ fontWeight: 500 }}
            >
              {status ? t("status.active") : t("status.inactive")}
            </Tag>
          )}
        />
        <Table.Column
          title={t("columns.createdAt")}
          dataIndex="createdAt"
          render={(_, r: IBankType) => formatDate(r.createdAt)}
        />
        <Table.Column
          title={t("columns.updatedAt")}
          dataIndex="updatedAt"
          render={(_, r: IBankType) => formatDate(r.updatedAt)}
        />
        <Table.Column
          title={t("columns.deletedAt")}
          dataIndex="deletedAt"
          render={(_, r: IBankType) =>
            r.deletedAt ? (
              <Tag
                color={r.isActive ? "success" : "error"}
                style={{ fontWeight: 500 }}
              >
                {formatDate(r.deletedAt)}
              </Tag>
            ) : (
              "-"
            )
          }
        />
        <Table.Column
          title={t("columns.action")}
          render={(_, r: IBankType) => (
            <Flex gap="small">
              <Tooltip
                title={
                  r.isActive ? t("tooltip.deactivate") : t("tooltip.activate")
                }
              >
                <Button
                  type="default"
                  icon={
                    r.isActive ? (
                      <TbForbid2 size={"20"} />
                    ) : (
                      <TbCircleCheck size={"20"} />
                    )
                  }
                  onClick={() => {
                    mutateUpdate({ id: r.id, isActive: !r.isActive });
                  }}
                />
              </Tooltip>
              <ModalUpdateBankType payload={r} />
              <Tooltip title={t("tooltip.delete")}>
                <Popconfirm
                  title={t("popconfirm.deleteTitle")}
                  onConfirm={() => {
                    mutateDelete({ ids: [r.id] });
                  }}
                  okText={t("popconfirm.ok")}
                  cancelText={t("popconfirm.cancel")}
                >
                  <Button danger icon={<DeleteOutlined />} />
                </Popconfirm>
              </Tooltip>
            </Flex>
          )}
        />
      </Table>
    </Flex>
  );
};
