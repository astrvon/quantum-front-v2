"use client";

import { AppstoreOutlined } from "@ant-design/icons";
import { Button, Modal, Table, Tag, Flex, Input } from "antd";
import { groupBy, map, uniq } from "lodash";
import { useTranslations } from "next-intl";
import { useMemo, useState } from "react";

import { IRolePermission } from "@/common/interfaces/data/rolePermission";
import { IPermissionColor } from "@/common/interfaces/enum/permissionColor.enum";

export interface IModalDetailRolePermissionsProps {
  rolePermissions: IRolePermission[];
  name: string;
}

export const ModalDetailRolePermissions = ({
  rolePermissions,
  name,
}: IModalDetailRolePermissionsProps) => {
  const t = useTranslations("RolePage.detailRole");

  const [isModal, setModal] = useState(false);
  const [search, setSearch] = useState<string | undefined>();

  const groupedData = useMemo(() => {
    const grouped = groupBy(rolePermissions, "scopeId");

    return map(grouped, (items, scopeId) => ({
      id: scopeId,
      name: items[0].scope.name,
      actions: uniq(items.map((rp) => rp.action)),
    }));
  }, [rolePermissions]);

  const filteredData = useMemo(() => {
    if (!search) return groupedData;

    const lowerSearch = search.toLowerCase();
    return groupedData.filter(({ name, actions }) => {
      const nameMatch = name.toLowerCase().includes(lowerSearch);
      const actionMatch = actions.some((action) =>
        action.toLowerCase().includes(lowerSearch)
      );
      return nameMatch || actionMatch;
    });
  }, [search, groupedData]);

  return (
    <>
      <Button
        onClick={() => setModal(true)}
        type="link"
        style={{ display: "flex", alignItems: "center", gap: 8 }}
      >
        <AppstoreOutlined size={18} color="#1677ff" />
        <Tag color="processing" style={{ margin: 0 }}>
          {t("button.label", { count: groupedData.length })}
        </Tag>
      </Button>

      <Modal
        open={isModal}
        title={t("modal.title", { name })}
        onCancel={() => setModal(false)}
        footer={null}
        width={"80vw"}
      >
        <Flex style={{ flexDirection: "column" }} gap={10}>
          <Flex gap={10}>
            <Input.Search
              placeholder={t("modal.searchPlaceholder")}
              onChange={(e) => setSearch(e.target.value)}
            />
          </Flex>
          <Table
            dataSource={filteredData}
            rowKey="id"
            bordered
            size="small"
            scroll={{ x: true }}
          >
            <Table.Column
              title={t("modal.table.no")}
              render={(_, __, index) => index + 1}
              width={60}
            />
            <Table.Column
              title={t("modal.table.name")}
              dataIndex="name"
              key="name"
            />
            <Table.Column
              title={t("modal.table.actions")}
              key="actions"
              render={(_, record: { actions: string[] }) => (
                <Flex gap={4} wrap="wrap">
                  {record.actions.map((action: string) => (
                    <Tag
                      key={action}
                      color={
                        IPermissionColor[
                          action as keyof typeof IPermissionColor
                        ] || "default"
                      }
                    >
                      {action}
                    </Tag>
                  ))}
                </Flex>
              )}
            />
          </Table>
        </Flex>
      </Modal>
    </>
  );
};
