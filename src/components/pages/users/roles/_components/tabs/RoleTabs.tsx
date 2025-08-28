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

import useGetListRolesFetch from "@/common/custom/hooks/api/fetcher/roles/useGetListRolesFetch";
import useDeleteRoleMutation from "@/common/custom/hooks/api/mutation/roles/useDeleteRoleMutation";
import useUpdateRoleMutation from "@/common/custom/hooks/api/mutation/roles/useUpdateRoleMutation";
import { useDebounce } from "@/common/custom/hooks/share/useDebounce";
import { ParseTableNumber } from "@/common/helper/parseTableNumber";
import { IRoleResponse } from "@/common/interfaces/data/role";
import { formatDate } from "@/common/lib/dayjsDateFormat";
import { DEFAULT_PAGINATION } from "@/common/var/pagination";
import { ModalAddRoles } from "@/components/pages/users/roles/_components/modals/ModalAddRole";
import { ModalDetailRolePermissions } from "@/components/pages/users/roles/_components/modals/ModalDetailRolePermissions";
import { ModalUpdateRole } from "@/components/pages/users/roles/_components/modals/ModalUpdateRole";

export const RoleTabs = () => {
  const t = useTranslations("RolePage.tabs");
  const [pagination, setPagination] = useState(DEFAULT_PAGINATION);
  const [search, setSearch] = useState<string | undefined>(undefined);
  const searchDebounce = useDebounce(search);

  const { mutate: mutateUpdate } = useUpdateRoleMutation();
  const { mutate: mutateDelete, isPending: isLoadingDelete } =
    useDeleteRoleMutation();

  const { data, isLoading } = useGetListRolesFetch({
    params: {
      pagination: {
        ...pagination,
        search: searchDebounce,
      },
    },
  });

  return (
    <Flex style={{ flexDirection: "column", gap: 10 }}>
      <Flex gap={10}>
        <Input.Search
          placeholder={t("searchPlaceholder")}
          onChange={(e) => setSearch(e.target.value)}
        />
        <ModalAddRoles />
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
        />
        <Table.Column
          title={t("columns.name")}
          render={(_, r: IRoleResponse) => r.name}
        />
        <Table.Column
          title={t("columns.description")}
          key="description"
          render={(_, r: IRoleResponse) => <span>{r?.description || "-"}</span>}
        />
        <Table.Column
          title={t("columns.status")}
          key="isActive"
          dataIndex="isActive"
          render={(_, r: IRoleResponse) => (
            <Tag
              icon={r.isActive ? <CheckCircleFilled /> : <CloseCircleFilled />}
              color={r.isActive ? "success" : "error"}
              style={{ fontWeight: 500 }}
            >
              {r.isActive ? t("status.active") : t("status.inactive")}
            </Tag>
          )}
        />
        <Table.Column
          title={t("columns.scope")}
          render={(_, r: IRoleResponse) => (
            <ModalDetailRolePermissions
              rolePermissions={r.rolePermissions}
              name={r.name}
            />
          )}
        />
        <Table.Column
          title={t("columns.totalUser")}
          render={(_, r: IRoleResponse) => r.totalUser}
        />
        <Table.Column
          title={t("columns.totalRead")}
          render={(_, r: IRoleResponse) => r.totalReadPermission}
        />
        <Table.Column
          title={t("columns.totalWrite")}
          render={(_, r: IRoleResponse) => r.totalWritePermission}
        />
        <Table.Column
          title={t("columns.totalUpdate")}
          render={(_, r: IRoleResponse) => r.totalUpdatePermission}
        />
        <Table.Column
          title={t("columns.totalDelete")}
          render={(_, r: IRoleResponse) => r.totalDeletePermission}
        />
        <Table.Column
          title={t("columns.createdAt")}
          render={(_, r: IRoleResponse) => formatDate(r.createdAt)}
        />
        <Table.Column
          title={t("columns.updatedAt")}
          render={(_, r: IRoleResponse) => formatDate(r.updatedAt)}
        />
        <Table.Column
          title={t("columns.deletedAt")}
          render={(_, r: IRoleResponse) => formatDate(r?.deletedAt)}
        />
        <Table.Column
          title={t("columns.action")}
          key="action"
          render={(_, r: IRoleResponse) => (
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
              <ModalUpdateRole payload={r} />
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
