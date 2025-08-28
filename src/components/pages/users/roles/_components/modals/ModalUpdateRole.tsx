"use client";

import {
  DeleteOutlined,
  InfoCircleOutlined,
  PlusOutlined,
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
import { groupBy, mapValues } from "lodash";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { TbPencil } from "react-icons/tb";

import useGetListScopesFetch from "@/common/custom/hooks/api/fetcher/scopes/useGetListScopesFetch";
import useUpdateRoleMutation, {
  IUpdateRoleMutationPayload,
  RoleUpdateSchemaPayload,
} from "@/common/custom/hooks/api/mutation/roles/useUpdateRoleMutation";
import useCreateScopeMutation from "@/common/custom/hooks/api/mutation/scopes/useCreateScopesMutation";
import { useDebounce } from "@/common/custom/hooks/share/useDebounce";
import { IRole } from "@/common/interfaces/data/role";
import { IActionEnum } from "@/common/interfaces/enum/action.enum";
import { setZodFormErrors } from "@/common/lib/setZodFormErrors";
import { DEFAULT_PAGINATION } from "@/common/var/pagination";

interface ModalUpdateRoleParams {
  payload: IRole;
}

export const ModalUpdateRole = ({ payload }: ModalUpdateRoleParams) => {
  const t = useTranslations("RolePage.updateRole");

  const [isModal, setModal] = useState(false);
  const [form] = Form.useForm<Omit<IUpdateRoleMutationPayload, "id">>();

  const { mutate, isPending } = useUpdateRoleMutation({
    onSuccessCallback: () => {
      setModal(false);
      form.resetFields();
    },
  });

  const handleFinish = async () => {
    const values = await form.validateFields();
    const parsed = RoleUpdateSchemaPayload.safeParse({
      id: payload.id,
      ...values,
    });
    if (!parsed.success) return setZodFormErrors(parsed.error, form);
    mutate(parsed.data);
  };

  const [searchScope, setSearchScope] = useState<string>();
  const debouncedSearchScope = useDebounce(searchScope);
  const [newScopeName, setNewScopeName] = useState<string | undefined>();

  const { data: dataScopes, isLoading: isLoadingScopes } =
    useGetListScopesFetch({
      params: { ...DEFAULT_PAGINATION, search: debouncedSearchScope },
    });

  const { mutate: mutateCreateScope, isPending: isLoadingCreateScope } =
    useCreateScopeMutation({
      onSuccessCallback: () => {
        setNewScopeName(undefined);
      },
    });

  const handleAddNewScope = () => {
    if (newScopeName) mutateCreateScope({ name: newScopeName });
  };

  useEffect(() => {
    const grouped = groupBy(payload.rolePermissions, (rp) => rp.scope.name);
    const initialScopes = Object.entries(
      mapValues(grouped, (rps) => rps.map((rp) => rp.action))
    ).map(([scope, permissions]) => ({ scope, permissions }));
    form.setFieldsValue({
      name: payload.name,
      description: payload?.description || undefined,
      scopes: initialScopes,
    });
  }, [payload, form]);

  return (
    <div>
      <Tooltip title={t("tooltip")}>
        <Button
          ghost
          type="primary"
          loading={isPending}
          onClick={() => setModal(true)}
          icon={<TbPencil size={"20"} />}
        />
      </Tooltip>

      <Modal
        open={isModal}
        onCancel={() => setModal(false)}
        footer={false}
        width={800}
        loading={isPending}
        title={t("title", { name: payload.name })}
      >
        <Form form={form} onFinish={handleFinish} layout="vertical">
          <Form.Item name="name" label={t("form.name.label")}>
            <Input />
          </Form.Item>

          <Form.Item name="description" label={t("form.description.label")}>
            <Input.TextArea style={{ minHeight: 100 }} />
          </Form.Item>

          <Form.List name="scopes">
            {(fields, { add, remove }) => {
              const scopesInForm = form.getFieldValue("scopes") || [];
              const selectedScopeNames = (scopesInForm as { scope: string }[])
                .map((s) => s?.scope)
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
                                message: t("form.scope.required"),
                              },
                            ]}
                            style={{ marginBottom: 0 }}
                          >
                            <Select
                              showSearch
                              placeholder={t("form.scope.placeholder")}
                              loading={isLoadingScopes}
                              onSearch={(v) => setSearchScope(v)}
                              popupRender={(menu) => (
                                <>
                                  {menu}
                                  <Divider style={{ margin: "8px 0" }} />
                                  <Space style={{ padding: "0 8px 4px" }}>
                                    <Input
                                      placeholder={t(
                                        "form.addScope.inputPlaceholder"
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
                                      {t("form.addScope.button")}
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
                                message: t("form.permissions.required"),
                              },
                            ]}
                            style={{ marginBottom: 0 }}
                          >
                            <Checkbox.Group>
                              <Space>
                                {Object.values(IActionEnum).map((action) => (
                                  <Checkbox key={action} value={action}>
                                    {action}{" "}
                                    <Tooltip
                                      title={t("form.permissions.tooltip", {
                                        action,
                                      })}
                                    >
                                      <InfoCircleOutlined />
                                    </Tooltip>
                                  </Checkbox>
                                ))}
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
                      {t("form.addScope.button")}
                    </Button>
                  </Form.Item>

                  {isDuplicate && (
                    <div style={{ color: "red", marginBottom: 16 }}>
                      {t("form.duplicateWarning")}
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
