"use client";

import {
  CheckCircleFilled,
  CloseCircleFilled,
  DeleteOutlined,
} from "@ant-design/icons";
import { Button, Flex, Input, Popconfirm, Table, Tag, Tooltip } from "antd";
import { useTranslations } from "next-intl";
import React, { useState } from "react";
import { TbCircleCheck, TbForbid2 } from "react-icons/tb";

import useGetListVesselFetch from "@/common/custom/hooks/api/fetcher/vessel/useGetListVesselFetch";
import useDeleteVesselMutation from "@/common/custom/hooks/api/mutation/vessel/useDeleteVesselMutation";
import useUpdateVesselMutation from "@/common/custom/hooks/api/mutation/vessel/useUpdateVesselMutation";
import { useDebounce } from "@/common/custom/hooks/share/useDebounce";
import { ParseTableNumber } from "@/common/helper/parseTableNumber";
import { IRefVessel } from "@/common/interfaces/data/vessel";
import { formatDate } from "@/common/lib/dayjsDateFormat";
import { DEFAULT_PAGINATION } from "@/common/var/pagination";

import { ModalAddVessel } from "./_components/modals/ModalAddVessel";
import ModalDetailVessel from "./_components/modals/ModalDetailVessel";
import { ModalDetailVesselPhoto } from "./_components/modals/ModalDetailVesselPhoto";
import ModalUpdateVessel from "./_components/modals/ModalUpdateVessel";

const VesselPage = () => {
  const t = useTranslations("vesselPage");

  const [pagination, setPagination] = useState(DEFAULT_PAGINATION);
  const [search, setSearch] = useState<string>();
  const searchDebounce = useDebounce(search);

  const { data, isLoading } = useGetListVesselFetch({
    params: {
      pagination: {
        ...pagination,
        search: searchDebounce,
      },
    },
    enabled: true,
  });

  const { mutate: mutateUpdate, isPending: isPendingUpdate } =
    useUpdateVesselMutation();
  const { mutate: mutateDelete, isPending: isPendingDelete } =
    useDeleteVesselMutation();

  return (
    <Flex style={{ flexDirection: "column", gap: 10 }}>
      <h1>{t("title")}</h1>

      <Flex gap={10}>
        <Input.Search
          placeholder={t("searchPlaceholder")}
          onChange={(e) => setSearch(e.target.value)}
        />
        <ModalAddVessel />
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
          title={t("columns.vessel_name")}
          dataIndex="vessel_name"
          render={(_, r: IRefVessel) => r.vessel_name || "-"}
        />
        <Table.Column
          title={t("columns.vessel_code")}
          dataIndex="vessel_code"
          render={(_, r: IRefVessel) => r.vessel_code || "-"}
        />
        <Table.Column
          title={t("columns.vessel_type_name")}
          dataIndex="vessel_type_name"
          render={(_, r: IRefVessel) => (
            <Tag color="red">{r.VesselType?.name || "-"}</Tag>
          )}
        />
        <Table.Column
          title={t("columns.serial_number")}
          dataIndex="serial_number"
          render={(_, r: IRefVessel) => r.serial_number || "-"}
        />
        <Table.Column
          title={t("columns.imo_number")}
          dataIndex="imo_number"
          render={(_, r: IRefVessel) => (
            <ModalDetailVessel vessel={r} buttonText={r?.imo_number} />
          )}
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
          title="Photo"
          key="photos"
          render={(_, r: IRefVessel) => (
            <ModalDetailVesselPhoto
              vesselId={r.id}
              count={r._count?.ref_vessel_photo || 0}
            />
          )}
        />
        <Table.Column
          title={t("columns.customer")}
          dataIndex="customer"
          render={(_, r: IRefVessel) => r.Customer?.name || "-"}
        />
        <Table.Column
          title={t("columns.created_by")}
          dataIndex="created_by"
          render={(_, r: IRefVessel) => r?.CreatedBy?.name || "-"}
        />
        <Table.Column
          title={t("columns.updated_by")}
          dataIndex="updated_by"
          render={(_, r: IRefVessel) => r?.UpdatedBy?.name || "-"}
        />
        <Table.Column
          title={t("columns.created_date")}
          dataIndex="created_date"
          render={(_, r: IRefVessel) => formatDate(r?.created_date)}
        />
        <Table.Column
          title={t("columns.updated_date")}
          dataIndex="updated_date"
          render={(_, r: IRefVessel) => formatDate(r?.updated_date)}
        />
        <Table.Column
          title={t("columns.deleted_date")}
          dataIndex="deleted_date"
          render={(_, r: IRefVessel) =>
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
          render={(_, r: IRefVessel) => (
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
              <ModalUpdateVessel vessel={r} />
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

export default VesselPage;
