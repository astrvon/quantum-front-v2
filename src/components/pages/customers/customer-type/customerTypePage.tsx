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

import useGetListCustomerTypeFetch from "@/common/custom/hooks/api/fetcher/customer-type/useGetListCustomerTypeFetch";
import useDeleteCustomerTypeMutation from "@/common/custom/hooks/api/mutation/customer-type/useDeleteCustomerTypeMutation";
import useUpdateCustomerTypeMutation from "@/common/custom/hooks/api/mutation/customer-type/useUpdateCustomerTypeMutation";
import { useDebounce } from "@/common/custom/hooks/share/useDebounce";
import { ParseTableNumber } from "@/common/helper/parseTableNumber";
import { ICustomerType } from "@/common/interfaces/data/customerType";
import { formatDate } from "@/common/lib/dayjsDateFormat";
import { DEFAULT_PAGINATION } from "@/common/var/pagination";

import { ModalAddCustomerType } from "./_components/modals/ModalAddCustomerType";
import { ModalUpdateCustomerType } from "./_components/modals/ModalUpdateCustomerType";

const CustomerTypePage = () => {
  const t = useTranslations("CustomerTypePage");
  const [pagination, setPagination] = useState(DEFAULT_PAGINATION);
  const [search, setSearch] = useState<string | undefined>(undefined);
  const searchDebounce = useDebounce(search);

  const { mutate: mutateUpdate, isPending: isLoadingUpdate } =
    useUpdateCustomerTypeMutation();
  const { mutate: mutateDelete, isPending: isLoadingDelete } =
    useDeleteCustomerTypeMutation();

  const { data, isLoading } = useGetListCustomerTypeFetch({
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
      <Flex style={{ flexDirection: "column", gap: 10 }}>
        <Flex gap={10}>
          <Input.Search
            placeholder={t("placeholder.search")}
            onChange={(e) => setSearch(e.target.value)}
          />
          <ModalAddCustomerType />
        </Flex>
        <Table
          dataSource={data?.data}
          loading={isLoading || isLoadingDelete || isLoadingUpdate}
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
          rowKey="id"
          style={{ flex: 1 }}
          scroll={{ x: true }}
        >
          <Table.Column
            title={t("columns.no")}
            key="no"
            render={(_v, _r, i) => ParseTableNumber(i, pagination)}
          />
          <Table.Column
            title={t("columns.name")}
            render={(_, r: ICustomerType) => r.name}
          />
          <Table.Column
            title={t("columns.status")}
            key="isActive"
            dataIndex="isActive"
            render={(_, r: ICustomerType) => (
              <Tag
                icon={
                  r.isActive ? <CheckCircleFilled /> : <CloseCircleFilled />
                }
                color={r.isActive ? "success" : "error"}
                style={{ fontWeight: 500 }}
              >
                {r.isActive ? t("status.active") : t("status.inactive")}
              </Tag>
            )}
          />
          <Table.Column
            title={t("columns.createdAt")}
            render={(_, r: ICustomerType) => formatDate(r.createdAt)}
          />
          <Table.Column
            title={t("columns.updatedAt")}
            render={(_, r: ICustomerType) => formatDate(r.updatedAt)}
          />
          <Table.Column
            title={t("columns.deletedAt")}
            dataIndex="deletedAt"
            render={(_, r: ICustomerType) =>
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
            key="action"
            render={(_, r: ICustomerType) => (
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
                <ModalUpdateCustomerType payload={r} />
                <Tooltip title={t("tooltip.delete")}>
                  <Popconfirm
                    title={t("popconfirm.deleteTitle")}
                    onConfirm={() => {
                      mutateDelete({ ids: [r.id] });
                    }}
                    okText={t("popconfirm.ok")}
                    cancelText={t("popconfirm.cancel")}
                  >
                    <Button
                      danger
                      icon={<DeleteOutlined />}
                      disabled={!!r.deletedAt}
                    />
                  </Popconfirm>
                </Tooltip>
              </Flex>
            )}
          />
        </Table>
      </Flex>
    </Flex>
  );
};

export default CustomerTypePage;
