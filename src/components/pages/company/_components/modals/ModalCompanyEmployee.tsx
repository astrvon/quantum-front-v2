"use client";

import { UserOutlined } from "@ant-design/icons";
import { Button, Modal, Table, Tag, Flex, Input } from "antd";
import { useState } from "react";

import useGetListUsersByCompanyIdFetch from "@/common/custom/hooks/api/fetcher/users/useGetListUserByCompanyIdFetch";
import { useDebounce } from "@/common/custom/hooks/share/useDebounce";
import { ParseTableNumber } from "@/common/helper/parseTableNumber";
import { DEFAULT_PAGINATION } from "@/common/var/pagination";

export interface IModalCompanyEmployeeProps {
  companyId: string;
}

export const ModalCompanyEmployee = ({
  companyId,
}: IModalCompanyEmployeeProps) => {
  const [isModal, setModal] = useState(false);
  const [pagination, setPagination] = useState(DEFAULT_PAGINATION);
  const [search, setSearch] = useState<string | undefined>(undefined);
  const searchDebounce = useDebounce(search);

  const { data, isLoading } = useGetListUsersByCompanyIdFetch({
    params: {
      pagination: {
        ...pagination,
        search: searchDebounce,
      },
      filters: { companyId },
    },
  });

  return (
    <>
      <Button
        onClick={() => setModal(true)}
        type="link"
        style={{ display: "flex", alignItems: "center", gap: 8 }}
      >
        <UserOutlined size={18} color="#1677ff" />
        <Tag color="processing" style={{ margin: 0 }}>
          {data?.data.length} Employee
        </Tag>
      </Button>

      <Modal
        open={isModal}
        title={`Employee `}
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
          <Input.Search
            placeholder="search by name, username, email"
            onChange={(e) => setSearch(e.target.value)}
          />

          <Table
            dataSource={data?.data}
            rowKey="username"
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
            <Table.Column title="Name" dataIndex="name" key="name" />
            <Table.Column
              title="Username"
              dataIndex="username"
              key="username"
            />
            <Table.Column title="Email" dataIndex="email" key="email" />
          </Table>
        </Flex>
      </Modal>
    </>
  );
};
