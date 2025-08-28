"use client";

import {
  CheckCircleFilled,
  CloseCircleFilled,
  UserOutlined,
} from "@ant-design/icons";
import { Button, Flex, Input, Popconfirm, Table, Tag, Tooltip } from "antd";
import Paragraph from "antd/es/typography/Paragraph";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { FaTrash } from "react-icons/fa";
import {
  MdOutlineRemoveCircleOutline,
  MdOutlineCheckCircleOutline,
} from "react-icons/md";

import useGetListCustomersFetch from "@/common/custom/hooks/api/fetcher/customers/useGetListCustomersFetch";
import useDeleteCustomersMutation from "@/common/custom/hooks/api/mutation/customers/useDeleteCustomerMutation";
import useUpdateCustomerMutation from "@/common/custom/hooks/api/mutation/customers/useUpdateCustomerMutation";
import { useDebounce } from "@/common/custom/hooks/share/useDebounce";
import { ParseTableNumber } from "@/common/helper/parseTableNumber";
import { ICustomer } from "@/common/interfaces/data/customer";
import { formatDate } from "@/common/lib/dayjsDateFormat";
import { DEFAULT_PAGINATION } from "@/common/var/pagination";

import { ModalAddCustomer } from "./_components/modal/modalAddCustomer";
import { ModalBankAccountDetail } from "./_components/modal/modalBankAccountDetail";
import { ModalContactDetail } from "./_components/modal/modalContactDetail";
import { ModalListUsers } from "./_components/modal/modalListUsers";
import { ModalTaxInformationDetail } from "./_components/modal/modalTaxInformationDetail";
import { ModalUpdateCustomer } from "./_components/modal/modalUpdateCustomer";

const CustomerPage = () => {
  const [pagination, setPagination] = useState(DEFAULT_PAGINATION);
  const [search, setSearch] = useState<string | undefined>(undefined);
  const searchDebounce = useDebounce(search);
  const t = useTranslations("customersPage");

  const { data, isPending } = useGetListCustomersFetch({
    params: {
      pagination: { search: searchDebounce, ...pagination },
    },
  });

  const { mutate: mutateUpdate, isPending: isUpdatePending } =
    useUpdateCustomerMutation({
      onSuccessCallback: () => {
        setPagination((prev) => ({ ...prev, page: 1 }));
      },
    });

  const { mutate: mutateDelete, isPending: isDeletePending } =
    useDeleteCustomersMutation({
      onSuccessCallback: () => {
        setPagination((prev) => ({ ...prev, page: 1 }));
      },
    });

  const handleChangeName = (value: string, record: ICustomer) => {
    if (value === record.name) return;
    mutateUpdate({
      id: record.id,
      name: value,
    });
  };

  const handleConfirmDelete = (id: string) => {
    mutateDelete({ ids: [id] });
  };

  return (
    <Flex style={{ flexDirection: "column", gap: 10 }}>
      <h1>{t("title")}</h1>

      <Flex gap={10}>
        <Input.Search
          placeholder={t("search")}
          onChange={(e) => setSearch(e.target.value)}
        />
        <ModalAddCustomer />
      </Flex>

      <Table
        dataSource={data?.data}
        loading={isPending}
        rowKey="id"
        scroll={{ x: true }}
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
      >
        <Table.Column
          title="No"
          render={(_v, _r, i) => ParseTableNumber(i, pagination)}
        />
        <Table.Column
          title={t("table.name")}
          dataIndex="name"
          key="name"
          render={(_v, r: ICustomer) => (
            <Paragraph
              style={{ margin: 0, padding: 0 }}
              editable={{ onChange: (value) => handleChangeName(value, r) }}
            >
              {r.name}
            </Paragraph>
          )}
        />
        <Table.Column
          title={t("table.bankAccount")}
          render={(_v, r: ICustomer) => (
            <ModalBankAccountDetail
              customerId={r.id}
              totalAccounts={r._count.BankAccount}
            />
          )}
        />
        <Table.Column
          title={t("table.contact")}
          render={(_v, r: ICustomer) => <ModalContactDetail customer={r} />}
        />
        <Table.Column
          title={t("table.taxInformation")}
          render={(_v, r: ICustomer) => (
            <ModalTaxInformationDetail customer={r} />
          )}
        />
        <Table.Column
          title={t("table.users")}
          render={(_v, r: ICustomer) => (
            <ModalListUsers customerId={r.id} totalUsers={r._count.User} />
          )}
        />
        <Table.Column
          title={t("table.type")}
          dataIndex="customerType"
          key="customerType"
          render={(_v, r: ICustomer) =>
            r.CustomerType ? (
              <Tag color="success">
                <Flex gap={5}>
                  <UserOutlined />
                  {r.CustomerType.name}
                </Flex>
              </Tag>
            ) : (
              "-"
            )
          }
        />
        <Table.Column
          title={t("table.status")}
          dataIndex="isActive"
          key="isActive"
          render={(_v, r: ICustomer) => (
            <Tag
              color={r.isActive ? "success" : "error"}
              icon={r.isActive ? <CheckCircleFilled /> : <CloseCircleFilled />}
              style={{ fontWeight: 500 }}
            >
              {r.isActive ? t("table.data.active") : t("table.data.inactive")}
            </Tag>
          )}
        />
        <Table.Column
          title={t("table.createdAt")}
          dataIndex="createdAt"
          key="createdAt"
          render={(_v, r: ICustomer) => formatDate(r.createdAt)}
        />
        <Table.Column
          title={t("table.updatedAt")}
          dataIndex="updatedAt"
          key="updatedAt"
          render={(_v, r: ICustomer) =>
            r.updatedAt ? formatDate(r.updatedAt) : "-"
          }
        />
        <Table.Column
          title={t("table.deletedAt")}
          dataIndex="deletedAt"
          key="deletedAt"
          render={(_v, r: ICustomer) =>
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
          title={t("table.actions")}
          render={(_v, r: ICustomer) => (
            <Flex gap="small" justify="end">
              <Tooltip
                title={
                  r.isActive ? t("tooltip.deactivate") : t("tooltip.activate")
                }
              >
                <Button
                  type="default"
                  icon={
                    r.isActive ? (
                      <MdOutlineRemoveCircleOutline />
                    ) : (
                      <MdOutlineCheckCircleOutline />
                    )
                  }
                  onClick={() =>
                    mutateUpdate({ isActive: !r.isActive, id: r.id })
                  }
                  loading={isUpdatePending}
                />
              </Tooltip>
              <ModalUpdateCustomer customer={r} />
              <Tooltip title={t("tooltip.delete")}>
                <Popconfirm
                  title={t("popconfirm.title.delete")}
                  description={t("popconfirm.description.delete")}
                  onConfirm={() => handleConfirmDelete(r.id)}
                  okText={t("popconfirm.text.delete.ok")}
                  cancelText={t("popconfirm.text.delete.cancel")}
                  placement="left"
                >
                  <Button
                    type="default"
                    danger
                    icon={<FaTrash />}
                    loading={isDeletePending}
                    disabled={!!r.deletedAt}
                  />
                </Popconfirm>
              </Tooltip>
            </Flex>
          )}
        />
      </Table>
    </Flex>
  );
};

export default CustomerPage;
