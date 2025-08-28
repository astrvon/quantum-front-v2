"use client";

import { UserSwitchOutlined, DeleteOutlined } from "@ant-design/icons";
import {
  Button,
  Modal,
  Table,
  Tag,
  Flex,
  Tooltip,
  Popconfirm,
  Input,
} from "antd";
import { useState } from "react";

import useGetListRolesFetch from "@/common/custom/hooks/api/fetcher/roles/useGetListRolesFetch";
import useDeleteUserRolesMutation from "@/common/custom/hooks/api/mutation/users/useDeleteUserRolesMutation";
import { useDebounce } from "@/common/custom/hooks/share/useDebounce";
import { ParseTableNumber } from "@/common/helper/parseTableNumber";
import { IRole } from "@/common/interfaces/data/role";
import { DEFAULT_PAGINATION } from "@/common/var/pagination";

import { ModalAddUserRoles } from "./ModalAddUserRoles";

export interface IModalDetailUserRolesProps {
  userId: string;
  name: string;
}

export const ModalDetailUserRoles = ({
  userId,
  name,
}: IModalDetailUserRolesProps) => {
  const [isModal, setModal] = useState(false);
  const [pagination, setPagination] = useState(DEFAULT_PAGINATION);
  const [search, setSearch] = useState<string | undefined>(undefined);
  const searchDebounce = useDebounce(search);

  const { mutate: mutateDeleteRoles } = useDeleteUserRolesMutation();

  const { data, isLoading } = useGetListRolesFetch({
    params: {
      pagination: {
        ...pagination,
        search: searchDebounce,
      },
      filters: {
        userIds: [userId],
      },
    },
  });

  return (
    <>
      <Button
        onClick={() => setModal(true)}
        type="link"
        style={{ display: "flex", alignItems: "center", gap: 8 }}
      >
        <UserSwitchOutlined size={18} color="#1677ff" />
        <Tag color="processing" style={{ margin: 0 }}>
          {data?.data.length} roles
        </Tag>
      </Button>

      <Modal
        open={isModal}
        title={`Detail Role ${name}`}
        onCancel={() => setModal(false)}
        footer={null}
        width={"80vw"}
      >
        <Flex
          style={{
            flexDirection: "column",
          }}
          gap={10}
        >
          <Flex gap={10}>
            <Input.Search
              placeholder="search by name, description"
              onChange={(e) => setSearch(e.target.value)}
            />
            <ModalAddUserRoles userId={userId} />
          </Flex>
          <Table
            dataSource={data?.data}
            rowKey="id"
            bordered
            size="small"
            loading={isLoading}
            pagination={{
              current: pagination.page,
              pageSize: pagination.take,
              total: data?.meta?.total,
            }}
            onChange={(p) =>
              setPagination((prev) => ({ ...prev, page: p.current }))
            }
            style={{ flex: 1 }}
            scroll={{ x: true }}
          >
            <Table.Column
              title="No"
              width={50}
              render={(_v, _r, i) => ParseTableNumber(i, pagination)}
            />
            <Table.Column
              title="Name"
              dataIndex="name"
              key="name"
              render={(_, r: IRole) => r.name}
            />
            <Table.Column
              title="Description"
              key="description"
              render={(_, r: IRole) => <span>{r?.description || "-"} </span>}
            />
            <Table.Column
              title="Action"
              key="action"
              render={(_, r) => (
                <Flex gap={8} justify="end">
                  <Tooltip title="Delete">
                    <Popconfirm
                      title="Are you sure you want to delete this role?"
                      onConfirm={() => {
                        mutateDeleteRoles({
                          userId,
                          roleIds: [r.id],
                        });
                      }}
                      okText="Yes"
                      cancelText="No"
                    >
                      <Button danger icon={<DeleteOutlined />} />
                    </Popconfirm>
                  </Tooltip>
                </Flex>
              )}
            />
          </Table>
        </Flex>
      </Modal>
    </>
  );
};
