import {
  CheckCircleFilled,
  CloseCircleFilled,
  DeleteOutlined,
} from "@ant-design/icons";
import { Button, Flex, Input, Popconfirm, Table, Tag, Tooltip } from "antd";
import { useTranslations } from "next-intl";
import React, { useState } from "react";
import { TbCircleCheck, TbForbid2 } from "react-icons/tb";

import useGetListVesselTypeFetch from "@/common/custom/hooks/api/fetcher/vessel-type/useGetListVesselTypeFetch";
import useDeleteVesselTypeMutation from "@/common/custom/hooks/api/mutation/vessel-type/useDeleteVesselTypeMutation";
import useUpdateVesselTypeMutation from "@/common/custom/hooks/api/mutation/vessel-type/useUpdateVesselTypeMutation";
import { useDebounce } from "@/common/custom/hooks/share/useDebounce";
import { ParseTableNumber } from "@/common/helper/parseTableNumber";
import { IVesselType } from "@/common/interfaces/data/vesselType";
import { formatDate } from "@/common/lib/dayjsDateFormat";
import { DEFAULT_PAGINATION } from "@/common/var/pagination";

import { ModalAddVesselType } from "./_components/modals/ModalAddVesselType";
import ModalUpdateVesselType from "./_components/modals/ModalUpdateVesselType";

const VesselTypePage = () => {
  const t = useTranslations("vesselTypePage");

  const [pagination, setPagination] = useState(DEFAULT_PAGINATION);
  const [search, setSearch] = useState<string | undefined>(undefined);
  const searchDebounce = useDebounce(search);

  const { data, isLoading } = useGetListVesselTypeFetch({
    params: {
      pagination: {
        ...pagination,
        search: searchDebounce,
      },
    },
    enabled: true,
  });

  const { mutate: mutateUpdate, isPending: isPendingUpdate } =
    useUpdateVesselTypeMutation();

  const { mutate: mutateDelete, isPending: isPendingDelete } =
    useDeleteVesselTypeMutation();

  return (
    <Flex style={{ flexDirection: "column", gap: 10 }}>
      <h1>{t("title")}</h1>

      <Flex gap={10}>
        <Input.Search
          placeholder={t("searchPlaceholder")}
          onChange={(e) => setSearch(e.target.value)}
        />
        <ModalAddVesselType />
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
          title={t("columns.name")}
          dataIndex="name"
          render={(_, r: IVesselType) => r.name || "-"}
        />
        <Table.Column
          title={t("columns.vesselTypeCode")}
          dataIndex="vesselTypeCode"
          render={(_, r: IVesselType) => r.vesselTypeCode || "-"}
        />
        <Table.Column
          title={t("columns.description")}
          dataIndex="description"
          render={(_, r: IVesselType) => r.description || "-"}
        />
        <Table.Column
          title={t("columns.lastNumber")}
          dataIndex="lastNumber"
          render={(_, r: IVesselType) => r.lastNumber || "-"}
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
          title={t("columns.createdBy")}
          dataIndex="createdBy"
          render={(_, r: IVesselType) => r?.CreatedBy?.name || "-"}
        />
        <Table.Column
          title={t("columns.updatedBy")}
          dataIndex="updatedBy"
          render={(_, r: IVesselType) => r?.UpdatedBy?.name || "-"}
        />
        <Table.Column
          title={t("columns.createdAt")}
          dataIndex="createdAt"
          render={(_, r: IVesselType) => formatDate(r?.createdAt)}
        />
        <Table.Column
          title={t("columns.updatedAt")}
          dataIndex="updatedAt"
          render={(_, r: IVesselType) => formatDate(r?.updatedAt)}
        />
        <Table.Column
          title={t("columns.deletedAt")}
          dataIndex="deletedAt"
          render={(_, r: IVesselType) =>
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
          render={(_, r: IVesselType) => (
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
              <ModalUpdateVesselType vesselType={r} />
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

export default VesselTypePage;
