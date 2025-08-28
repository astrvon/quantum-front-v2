"use client";

import { DeleteOutlined } from "@ant-design/icons";
import { Button, Flex, Input, Popconfirm, Table, Tooltip } from "antd";
import { useTranslations } from "next-intl";
import { useState } from "react";

import useGetListScopesFetch from "@/common/custom/hooks/api/fetcher/scopes/useGetListScopesFetch";
import useDeleteScopeMutation from "@/common/custom/hooks/api/mutation/scopes/useDeleteScopesMutation";
import { useDebounce } from "@/common/custom/hooks/share/useDebounce";
import { ParseTableNumber } from "@/common/helper/parseTableNumber";
import { IScope } from "@/common/interfaces/data/scope";
import { DEFAULT_PAGINATION } from "@/common/var/pagination";

import { ModalAddScope } from "../modals/ModalAddScope";
import { ModalUpdateScope } from "../modals/ModalUpdateScope";

export const ScopeTabs = () => {
  const t = useTranslations("RolePage.scopeTabs");
  const [pagination, setPagination] = useState(DEFAULT_PAGINATION);
  const [search, setSearch] = useState<string | undefined>(undefined);
  const searchDebounce = useDebounce(search);

  const { mutate, isPending: isLoadingDelete } = useDeleteScopeMutation();

  const { data, isLoading } = useGetListScopesFetch({
    params: {
      ...pagination,
      search: searchDebounce,
    },
  });

  return (
    <Flex style={{ flexDirection: "column", gap: 10 }}>
      <Flex gap={10}>
        <Input.Search
          placeholder={t("searchPlaceholder")}
          onChange={(e) => setSearch(e.target.value)}
        />
        <ModalAddScope />
      </Flex>
      <Table
        dataSource={data?.data}
        loading={isLoading || isLoadingDelete}
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
          width={40}
        />
        <Table.Column
          title={t("columns.name")}
          render={(_, r: IScope) => r.name}
        />
        <Table.Column
          title={t("columns.action")}
          key="action"
          width={150}
          render={(_, r: IScope) => (
            <Flex gap="small" justify="end">
              <ModalUpdateScope payload={r} />
              <Tooltip title={t("tooltip.delete")}>
                <Popconfirm
                  title={t("popconfirm.deleteTitle")}
                  onConfirm={() => {
                    mutate({ ids: [r.id] });
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
