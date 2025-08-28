"use client";

import { Button, Flex, Input, Modal, Popconfirm, Table } from "antd";
import { useTranslations } from "next-intl";
import { Key, useCallback, useState } from "react";
import { FaTrash, FaUsers } from "react-icons/fa";

import useGetListUsersFetch from "@/common/custom/hooks/api/fetcher/users/useGetListUsersFetch";
import useRemoveUsersFromCustomerMutation, {
  RemoveUsersFromCustomerSchemaPayload,
} from "@/common/custom/hooks/api/mutation/users/useRemoveUsersFromCustomer";
import { useDebounce } from "@/common/custom/hooks/share/useDebounce";
import { ParseTableNumber } from "@/common/helper/parseTableNumber";
import { IUser } from "@/common/interfaces/data/user";
import { DEFAULT_PAGINATION } from "@/common/var/pagination";

import { ModalAddUsers } from "./modalAddUsers";

interface ModalListUsersProps {
  customerId: string;
  totalUsers: number;
}

export const ModalListUsers = ({
  customerId,
  totalUsers,
}: ModalListUsersProps) => {
  const [isModal, setIsModal] = useState<boolean>(false);
  const [pagination, setPagination] = useState(DEFAULT_PAGINATION);
  const [selectedRowKeys, setSelectedRowKeys] = useState<Key[]>([]);
  const [search, setSearch] = useState<string | undefined>(undefined);
  const searchDebounce = useDebounce(search);
  const t = useTranslations("modalListUsers");

  const { data, isPending } = useGetListUsersFetch({
    params: {
      pagination: { ...pagination, search: searchDebounce },
      filters: { customerId },
    },
    enabled: isModal,
  });

  const { mutate, isPending: isRemovePending } =
    useRemoveUsersFromCustomerMutation({
      onSuccessCallback: () => {
        setSelectedRowKeys([]);
      },
    });

  const handleRemove = useCallback(() => {
    const parsed = RemoveUsersFromCustomerSchemaPayload.safeParse({
      ids: selectedRowKeys,
      customerId,
    });
    if (!parsed.success) return;
    mutate(parsed.data);
  }, [customerId, mutate, selectedRowKeys]);

  return (
    <>
      <Button
        type="default"
        onClick={() => setIsModal(true)}
        icon={<FaUsers />}
      >
        {totalUsers}
      </Button>
      <Modal
        open={isModal}
        onCancel={() => setIsModal(false)}
        footer={false}
        width={600}
        title={t("title")}
      >
        <Flex style={{ flexDirection: "column", gap: 10 }}>
          <Flex gap={10}>
            <Input.Search
              placeholder={t("search")}
              onChange={(e) => setSearch(e.target.value)}
            />
            <ModalAddUsers customerId={customerId} />
            {selectedRowKeys.length !== 0 && (
              <Popconfirm
                title={t("popconfirm.title")}
                description={t("popconfirm.description")}
                onConfirm={handleRemove}
                okText={t("popconfirm.text.ok")}
                cancelText={t("popconfirm.text.cancel")}
                placement="left"
              >
                <Button
                  type="primary"
                  danger
                  icon={<FaTrash />}
                  loading={isPending || isRemovePending}
                  style={{ minWidth: 32 }}
                />
              </Popconfirm>
            )}
          </Flex>

          <Table
            dataSource={data?.data}
            loading={isPending || isRemovePending}
            rowKey="id"
            scroll={{ x: true }}
            rowSelection={{
              type: "checkbox",
              selectedRowKeys,
              onChange: (selectedKeys) => {
                setSelectedRowKeys(selectedKeys);
              },
            }}
            pagination={{
              current: pagination.page,
              pageSize: pagination.take,
              total: data?.meta?.total,
            }}
            onChange={(p) =>
              setPagination((prev) => ({ ...prev, page: p.current }))
            }
          >
            <Table.Column
              title="No"
              render={(_v, _r, i) => ParseTableNumber(i, pagination)}
            />
            <Table.Column
              title={t("table.name")}
              dataIndex="name"
              key="name"
              render={(_v, r: Omit<IUser, "uid">) => r.name}
            />
            <Table.Column
              title={t("table.email")}
              dataIndex="email"
              key="email"
              render={(_v, r: Omit<IUser, "uid">) => r.email || "-"}
            />
            <Table.Column
              title={t("table.username")}
              dataIndex="username"
              key="username"
              render={(_v, r: Omit<IUser, "uid">) => r.username}
            />
          </Table>
        </Flex>
      </Modal>
    </>
  );
};
