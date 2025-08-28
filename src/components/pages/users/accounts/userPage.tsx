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

import useGetListUsersFetch from "@/common/custom/hooks/api/fetcher/users/useGetListUsersFetch";
import useDeleteUserMutation from "@/common/custom/hooks/api/mutation/accounts/useDeleteUserMutation";
import useUpdateUserMutation from "@/common/custom/hooks/api/mutation/accounts/useUpdateUserMutation";
import { useDebounce } from "@/common/custom/hooks/share/useDebounce";
import { ParseTableNumber } from "@/common/helper/parseTableNumber";
import { IUser } from "@/common/interfaces/data/user";
import { formatDate } from "@/common/lib/dayjsDateFormat";
import { DEFAULT_PAGINATION } from "@/common/var/pagination";
import { ModalAddUser } from "@/components/pages/users/accounts/_components/modals/ModalAddUser";
import { ModalDetailUserRoles } from "@/components/pages/users/accounts/_components/modals/ModalDetailUserRoles";
import { ModalUpdateUser } from "@/components/pages/users/accounts/_components/modals/ModalEditUser";
import { ModalShowResetPasswordUrl } from "@/components/pages/users/accounts/_components/modals/ModalShowResetPasswordUrl";

import ModalDetailUser from "./_components/modals/ModalDetailUser";

export const UserPage = () => {
  const t = useTranslations("userPage");

  const [pagination, setPagination] = useState(DEFAULT_PAGINATION);
  const [search, setSearch] = useState<string | undefined>(undefined);
  const searchDebounce = useDebounce(search);

  const { mutate: mutateDelete, isPending: isLoadingDelete } =
    useDeleteUserMutation();
  const { mutate: mutateUpdate } = useUpdateUserMutation();

  const { data, isLoading } = useGetListUsersFetch({
    params: {
      pagination: { ...pagination, search: searchDebounce },
    },
  });

  return (
    <Flex style={{ flexDirection: "column", gap: 10 }}>
      <h1>{t("title")}</h1>

      <Flex gap={10}>
        <Input.Search
          placeholder={t("searchPlaceholder")}
          onChange={(e) => setSearch(e.target.value)}
        />
        <ModalAddUser />
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
        <Table.Column
          title={t("columns.name")}
          dataIndex="name"
          key="name"
          render={(_, r: IUser) =>
            r.name ? <ModalDetailUser payload={r} /> : "-"
          }
        />
        <Table.Column
          title={t("columns.username")}
          dataIndex="username"
          key="username"
        />
        <Table.Column
          title={t("columns.email")}
          dataIndex="email"
          render={(_, r: IUser) => r.email || "-"}
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
          title={t("columns.role")}
          render={(_, r: IUser) => (
            <ModalDetailUserRoles userId={r.id} name={r.name} />
          )}
        />
        <Table.Column
          title={t("columns.createdAt")}
          dataIndex="createdAt"
          render={(_, r: IUser) => formatDate(r?.createdAt)}
        />
        <Table.Column
          title={t("columns.updatedAt")}
          dataIndex="updatedAt"
          render={(_, r: IUser) => formatDate(r?.updatedAt)}
        />
        <Table.Column
          title={t("columns.deletedAt")}
          dataIndex="deletedAt"
          render={(_, r: IUser) =>
            r.deletedAt ? (
              <Tag
                color={r.isActive ? "success" : "error"}
                style={{ fontWeight: 500 }}
              >
                {formatDate(r?.deletedAt)}
              </Tag>
            ) : (
              "-"
            )
          }
        />
        <Table.Column
          title={t("columns.action")}
          render={(_, r: IUser) => (
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
              <ModalShowResetPasswordUrl id={r.id} />
              <ModalUpdateUser payload={r} />
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
