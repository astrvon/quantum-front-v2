"use client";

import {
  DeleteOutlined,
  PlusOutlined,
  InfoCircleOutlined,
} from "@ant-design/icons";
import {
  Button,
  Checkbox,
  Col,
  Divider,
  Form,
  Input,
  Modal,
  Row,
  Select,
  Space,
  Tooltip,
} from "antd";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { LiaAddressCard } from "react-icons/lia";
import { z } from "zod";

import useGetListScopesFetch from "@/common/custom/hooks/api/fetcher/scopes/useGetListScopesFetch";
import useCreateRoleMutation from "@/common/custom/hooks/api/mutation/roles/useCreateRolesMutation";
import useCreateScopeMutation from "@/common/custom/hooks/api/mutation/scopes/useCreateScopesMutation";
import { useDebounce } from "@/common/custom/hooks/share/useDebounce";
import { IActionEnum } from "@/common/interfaces/enum/action.enum";
import { setZodFormErrors } from "@/common/lib/setZodFormErrors";
import { DEFAULT_PAGINATION } from "@/common/var/pagination";

export const RoleFormSchema = z.object({
  name: z.string().min(4),
  description: z.string().optional(),
  scopes: z
    .array(
      z.object({
        scope: z.string(),
        permissions: z
          .array(
            z.enum([
              IActionEnum.READ,
              IActionEnum.WRITE,
              IActionEnum.UPDATE,
              IActionEnum.DELETE,
            ])
          )
          .min(1),
      })
    )
    .min(1),
});

export type IRoleForm = z.infer<typeof RoleFormSchema>;

export const ModalAddRoles = () => {
  const t = useTranslations("RolePage.modal");

  const [isModal, setModal] = useState(false);
  const [form] = Form.useForm<IRoleForm>();

  const [searchScope, setSearchScope] = useState<string | undefined>();
  const searchScopeDebounce = useDebounce(searchScope);
  const [newScopeName, setNewScopeName] = useState<string | undefined>();

  const { data: dataScopes, isLoading: isLoadingScopes } =
    useGetListScopesFetch({
      params: {
        ...DEFAULT_PAGINATION,
        search: searchScopeDebounce,
      },
    });

  const { mutate: mutateCreateScope, isPending: isLoadingCreateScope } =
    useCreateScopeMutation({
      onSuccessCallback: () => {
        setNewScopeName(undefined);
      },
    });

  const { mutate, isPending: isLoadingCreateRole } = useCreateRoleMutation({
    onSuccessCallback: () => {
      setModal(false);
      form.resetFields();
    },
  });

  const handleAddNewScope = () => {
    if (newScopeName) mutateCreateScope({ name: newScopeName });
  };

  const handleFinish = async () => {
    const values = await form.validateFields();
    const parsed = RoleFormSchema.safeParse(values);
    if (!parsed.success) return setZodFormErrors(parsed.error, form);
    mutate(parsed.data);
  };

  return (
    <div>
      <Button
        type="primary"
        onClick={() => setModal(true)}
        loading={isLoadingCreateRole}
        icon={<LiaAddressCard size={"20"} />}
      >
        {t("addRole")}
      </Button>

      <Modal
        open={isModal}
        onCancel={() => setModal(false)}
        footer={false}
        width={800}
        loading={isLoadingCreateRole}
        title={t("title")}
      >
        <Form form={form} onFinish={handleFinish} layout="vertical">
          <Form.Item
            name="name"
            label={t("form.name.label")}
            rules={[{ required: true, message: t("form.name.required") }]}
            required
          >
            <Input placeholder={t("form.name.placeholder")} />
          </Form.Item>

          <Form.Item name="description" label={t("form.description.label")}>
            <Input.TextArea
              placeholder={t("form.description.placeholder")}
              style={{ minHeight: 100 }}
            />
          </Form.Item>

          <Form.List
            name="scopes"
            initialValue={[
              {
                scope: dataScopes?.data?.[0]?.name,
                permissions: ["READ"],
              },
            ]}
          >
            {(fields, { add, remove }) => {
              const scopesInForm = form.getFieldValue("scopes") || [];
              const selectedScopeNames = scopesInForm
                .map((s: IRoleForm["scopes"][0]) => s?.scope)
                .filter(Boolean);

              const isDuplicate =
                new Set(selectedScopeNames).size !== selectedScopeNames.length;
              const canAddScope =
                dataScopes?.data?.some(
                  (s) => !selectedScopeNames.includes(s.name)
                ) ?? false;

              return (
                <>
                  {fields.map(({ key, name }) => {
                    const currentValue = form.getFieldValue([
                      "scopes",
                      name,
                      "scope",
                    ]);

                    return (
                      <Row
                        gutter={8}
                        key={key}
                        align="middle"
                        style={{ marginBottom: 10 }}
                      >
                        <Col span={7}>
                          <Form.Item
                            name={[name, "scope"]}
                            rules={[
                              {
                                required: true,
                                message: t("form.scopes.scopeRequired"),
                              },
                            ]}
                            style={{ marginBottom: 0 }}
                          >
                            <Select
                              showSearch
                              placeholder={t("form.scopes.select")}
                              loading={isLoadingScopes}
                              onSearch={(v) => setSearchScope(v)}
                              popupRender={(menu) => (
                                <>
                                  {menu}
                                  <Divider style={{ margin: "8px 0" }} />
                                  <Space style={{ padding: "0 8px 4px" }}>
                                    <Input
                                      placeholder={t(
                                        "form.scopes.newScopeInput"
                                      )}
                                      value={newScopeName}
                                      onChange={(e) =>
                                        setNewScopeName(e.target.value)
                                      }
                                      disabled={isLoadingCreateScope}
                                      onKeyDown={(e) => e.stopPropagation()}
                                    />
                                    <Button
                                      type="text"
                                      size="middle"
                                      icon={<PlusOutlined />}
                                      onClick={handleAddNewScope}
                                      disabled={!newScopeName}
                                      loading={isLoadingCreateScope}
                                    >
                                      {t("form.scopes.addNewScopeBtn")}
                                    </Button>
                                  </Space>
                                </>
                              )}
                            >
                              {dataScopes?.data
                                ?.filter(
                                  (scope) =>
                                    !selectedScopeNames.includes(scope.name) ||
                                    scope.name === currentValue
                                )
                                .map((scope) => (
                                  <Select.Option
                                    key={scope.name}
                                    value={scope.name}
                                  >
                                    {scope.name}
                                  </Select.Option>
                                ))}
                            </Select>
                          </Form.Item>
                        </Col>

                        <Col span={15}>
                          <Form.Item
                            name={[name, "permissions"]}
                            rules={[
                              {
                                required: true,
                                message: t("form.scopes.permissionRequired"),
                              },
                            ]}
                            style={{ marginBottom: 0 }}
                          >
                            <Checkbox.Group>
                              <Space>
                                {["READ", "WRITE", "UPDATE", "DELETE"].map(
                                  (perm) => (
                                    <Checkbox key={perm} value={perm}>
                                      {t(`form.permissions.${perm}`)}{" "}
                                      <Tooltip
                                        title={t(
                                          `form.permissions.tooltips.${perm}`
                                        )}
                                      >
                                        <InfoCircleOutlined />
                                      </Tooltip>
                                    </Checkbox>
                                  )
                                )}
                              </Space>
                            </Checkbox.Group>
                          </Form.Item>
                        </Col>

                        <Col span={2}>
                          <Button
                            danger
                            icon={<DeleteOutlined />}
                            onClick={() => remove(name)}
                          />
                        </Col>
                      </Row>
                    );
                  })}

                  <Form.Item>
                    <Button
                      type="dashed"
                      icon={<PlusOutlined />}
                      onClick={() =>
                        add({
                          scope: dataScopes?.data?.find(
                            (s) => !selectedScopeNames.includes(s.name)
                          )?.name,
                          permissions: ["READ"],
                        })
                      }
                      disabled={!canAddScope}
                      loading={isLoadingScopes}
                      block
                    >
                      {t("form.scopes.addScopeBtn")}
                    </Button>
                  </Form.Item>

                  {isDuplicate && (
                    <div style={{ color: "red", marginBottom: 16 }}>
                      {t("form.scopes.duplicateWarning")}
                    </div>
                  )}
                </>
              );
            }}
          </Form.List>

          <Button type="primary" block htmlType="submit">
            {t("form.submit")}
          </Button>
        </Form>
      </Modal>
    </div>
  );
};
