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

import useGetListCompanyFetch from "@/common/custom/hooks/api/fetcher/company/useGetListCompanyFetch";
import useDeleteCompanyMutation from "@/common/custom/hooks/api/mutation/company/useDeleteCompanyMutation";
import useUpdateCompanyMutation from "@/common/custom/hooks/api/mutation/company/useUpdateCompanyMutation";
import { useDebounce } from "@/common/custom/hooks/share/useDebounce";
import { ParseTableNumber } from "@/common/helper/parseTableNumber";
import { ICompany } from "@/common/interfaces/data/company";
import { formatDate } from "@/common/lib/dayjsDateFormat";
import { DEFAULT_PAGINATION } from "@/common/var/pagination";

import { ModalAddCompany } from "./_components/modals/ModalAddCompany";
import { ModalCompanyEmployee } from "./_components/modals/ModalCompanyEmployee";
import { ModalUpdateCompany } from "./_components/modals/ModalUpdateCompany";

export const CompanyPage = () => {
  const t = useTranslations("companyPage");

  const [pagination, setPagination] = useState(DEFAULT_PAGINATION);
  const [search, setSearch] = useState<string | undefined>(undefined);
  const searchDebounce = useDebounce(search);

  const { data, isLoading } = useGetListCompanyFetch({
    params: {
      pagination: {
        ...pagination,
        search: searchDebounce,
      },
    },
    enabled: true,
  });

  const { mutate: mutateUpdate, isPending: isPendingUpdate } =
    useUpdateCompanyMutation();

  const { mutate: mutateDelete, isPending: isPendingDelete } =
    useDeleteCompanyMutation();

  return (
    <Flex style={{ flexDirection: "column", gap: 10 }}>
      <h1>{t("title")}</h1>

      <Flex gap={10}>
        <Input.Search
          placeholder={t("searchPlaceholder")}
          onChange={(e) => setSearch(e.target.value)}
        />
        <ModalAddCompany />
      </Flex>

      <Table
        dataSource={data?.data}
        loading={isLoading || isPendingDelete || isPendingUpdate}
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
          title={t("columns.company_name")}
          dataIndex="company_name"
          render={(_, r: ICompany) => r.company_name || "-"}
        />
        <Table.Column
          title={t("columns.company_code")}
          dataIndex="company_code"
          render={(_, r: ICompany) => r.company_code || "-"}
        />
        <Table.Column
          title="Employee"
          render={(_, r: ICompany) => <ModalCompanyEmployee companyId={r.id} />}
        />
        <Table.Column
          title={t("columns.address")}
          dataIndex="address"
          render={(_, r: ICompany) => r.address || "-"}
        />
        <Table.Column
          title={t("columns.phone_number_1")}
          dataIndex="phone_number_1"
          render={(_, r: ICompany) => r.phone_number_1 || "-"}
        />
        <Table.Column
          title={t("columns.phone_number_2")}
          dataIndex="phone_number_2"
          render={(_, r: ICompany) => r.phone_number_2 || "-"}
        />
        <Table.Column
          title={t("columns.email")}
          dataIndex="email"
          render={(_, r: ICompany) => r.email || "-"}
        />
        <Table.Column
          title={t("columns.website")}
          dataIndex="website"
          render={(_, r: ICompany) => r.website || "-"}
        />
        <Table.Column
          title={t("columns.fax")}
          dataIndex="fax"
          render={(_, r: ICompany) => r.fax || "-"}
        />
        <Table.Column
          title={t("columns.status")}
          key="is_active"
          dataIndex="is_active"
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
          title={t("columns.created_date")}
          dataIndex="created_date"
          render={(_, r: ICompany) => formatDate(r?.created_date)}
        />
        <Table.Column
          title={t("columns.updated_date")}
          dataIndex="updated_date"
          render={(_, r: ICompany) => formatDate(r?.updated_date)}
        />
        <Table.Column
          title={t("columns.deleted_date")}
          dataIndex="deleted_date"
          render={(_, r: ICompany) =>
            r.deleted_date ? (
              <Tag
                color={r.is_active ? "success" : "error"}
                style={{ fontWeight: 500 }}
              >
                {formatDate(r?.deleted_date)}
              </Tag>
            ) : (
              "-"
            )
          }
        />
        <Table.Column
          title={t("columns.action")}
          render={(_, r: ICompany) => (
            <Flex gap="small">
              <Tooltip
                title={
                  r.is_active ? t("tooltip.deactivate") : t("tooltip.activate")
                }
              >
                <Button
                  type="default"
                  icon={
                    r.is_active ? (
                      <TbForbid2 size={"20"} />
                    ) : (
                      <TbCircleCheck size={"20"} />
                    )
                  }
                  onClick={() => {
                    mutateUpdate({ id: r.id, isActive: !r.is_active });
                  }}
                />
              </Tooltip>
              <ModalUpdateCompany company={r} />
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
