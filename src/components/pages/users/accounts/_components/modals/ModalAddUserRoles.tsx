"use client";

import { UserSwitchOutlined } from "@ant-design/icons";
import { Button, Form, Modal, Select } from "antd";
import { useMemo, useState } from "react";

import useGetListRolesFetch from "@/common/custom/hooks/api/fetcher/roles/useGetListRolesFetch";
import useCreateUserRolesMutation, {
  ICreateUserRolesMutationPayload,
} from "@/common/custom/hooks/api/mutation/users/useCreateUserRolesMutation";
import { useDebounce } from "@/common/custom/hooks/share/useDebounce";

export interface IModalAddUserRolesProps {
  userId: string;
}

export const ModalAddUserRoles = ({ userId }: IModalAddUserRolesProps) => {
  const [isModal, setModal] = useState(false);
  const [form] = Form.useForm<ICreateUserRolesMutationPayload>();
  const [search, setSearch] = useState<string | undefined>(undefined);
  const searchDebounce = useDebounce(search);

  const { data, isLoading } = useGetListRolesFetch({
    params: {
      pagination: {
        page: 1,
        take: 25,
        search: searchDebounce,
      },
    },
  });

  const rolesOptions = useMemo(
    () =>
      data?.data?.map((role) => ({
        label: role.name,
        value: role.id,
      })) ?? [],
    [data?.data]
  );

  const { mutate: mutateCreateRoles, isPending } = useCreateUserRolesMutation({
    onSuccessCallback: () => {
      form.resetFields();
      setModal(false);
    },
  });

  const handleFinish = () => {
    const parsed = form.getFieldsValue();
    mutateCreateRoles({
      userId,
      roleIds: parsed.roleIds,
    });
  };

  return (
    <div>
      <Button
        type="primary"
        onClick={() => setModal(true)}
        icon={<UserSwitchOutlined />}
        loading={isPending}
      >
        Add Roles
      </Button>
      <Modal
        open={isModal}
        onCancel={() => {
          form.resetFields();
          setModal(false);
        }}
        footer={false}
        width={500}
        title="Add Role to User"
      >
        <Form form={form} layout="vertical" onFinish={handleFinish}>
          <Form.Item name="roleIds" label="Roles">
            <Select
              mode="multiple"
              placeholder="Select roles"
              options={rolesOptions}
              onSearch={(val) => setSearch(val)}
              showSearch
              filterOption={false}
              loading={isLoading}
            />
          </Form.Item>

          <Button type="primary" block htmlType="submit">
            Add Roles
          </Button>
        </Form>
      </Modal>
    </div>
  );
};
