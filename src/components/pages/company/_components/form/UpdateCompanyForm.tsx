import { InboxOutlined } from "@ant-design/icons";
import {
  Form,
  Row,
  Col,
  Input,
  Select,
  Spin,
  Button,
  UploadFile,
  Image,
} from "antd";
import { DefaultOptionType } from "antd/es/select";
import Dragger from "antd/es/upload/Dragger";
import { useTranslations } from "next-intl";
import { useState, useMemo, useEffect } from "react";

import useGetListCompanyCategoryFetch from "@/common/custom/hooks/api/fetcher/company-category/useGetListCompanyCategoryFetch";
import useGetListUsersFetch from "@/common/custom/hooks/api/fetcher/users/useGetListUsersFetch";
import useUpdateCompanyMutation, {
  CompanyUpdateSchemaPayload,
  IUpdateCompanyMutationPayload,
} from "@/common/custom/hooks/api/mutation/company/useUpdateCompanyMutation";
import { useDebounce } from "@/common/custom/hooks/share/useDebounce";
import { handleUploadImageChange } from "@/common/helper/handleUploadImageChange";
import { ICompany } from "@/common/interfaces/data/company";
import { setZodFormErrors } from "@/common/lib/setZodFormErrors";

export interface IUpdateCompanyFormProps {
  onSuccess?: (data: Partial<ICompany>) => void;
  enabledFetch?: boolean;
  company: ICompany;
}

export const UpdateCompanyForm = ({
  onSuccess,
  enabledFetch = true,
  company,
}: IUpdateCompanyFormProps) => {
  const t = useTranslations("modalCompany");
  const [form] = Form.useForm<Omit<IUpdateCompanyMutationPayload, "id">>();
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [preview, setPreview] = useState<string | null>(null);

  const [search, setSearch] = useState<string>();
  const [searchCompanyCategory, setSearchCompanyCategory] = useState<string>();

  const searchDebounce = useDebounce(search);
  const searchCompanyCategoryDebounce = useDebounce(searchCompanyCategory);

  const [selectedUsers, setSelectedUsers] = useState<
    { label: string; value: string }[]
  >([]);

  const { data: companyCategorys, isLoading: isLoadingCompanyCategory } =
    useGetListCompanyCategoryFetch({
      params: {
        pagination: {
          search: searchCompanyCategoryDebounce,
          page: 1,
          take: 25,
        },
      },
      enabled: enabledFetch,
    });

  const companyCategoryOptions = useMemo<DefaultOptionType[]>(
    () =>
      companyCategorys?.data?.map((category) => ({
        value: category.id,
        label: category.company_category,
      })) || [],
    [companyCategorys?.data]
  );

  const { data, isLoading: isLoadingUser } = useGetListUsersFetch({
    params: {
      pagination: { page: 1, take: 25, search: searchDebounce },
      filters: { isCompany: false },
    },
  });

  const userOptions = useMemo<DefaultOptionType[]>(
    () =>
      data?.data?.map((user) => ({
        value: user.id,
        label: user.name,
      })) || [],
    [data?.data]
  );

  useEffect(() => {
    if (!company?.id) return;
    const selected =
      company.CompanyEmployee?.map((e) => ({
        label: e.User.name,
        value: e.userId,
      })) ?? [];

    setSelectedUsers(selected);

    form.setFieldsValue({
      companyName: company.company_name,
      companyCode: company.company_code,
      companyCategoryId: company.company_category_id,
      address: company.address,
      phoneNumber1: company.phone_number_1,
      phoneNumber2: company.phone_number_2,
      fax: company.fax,
      email: company.email || undefined,
      website: company.website,
      logoImage: company.logo_image,
      isActive: company.is_active,
      userIds: selected.map((s) => s.value),
    });

    if (company.logo_image) {
      setPreview(company.logo_image);
    }
  }, [company, form]);

  const { mutate: mutateUpdate, isPending } = useUpdateCompanyMutation({
    onSuccessCallback: (data) => {
      onSuccess?.(data);
      form.resetFields();
      setFileList([]);
      setPreview(null);
      setSelectedUsers([]);
    },
  });

  const handleFinish = async () => {
    const values = await form.validateFields();
    values.email = values.email || undefined;
    values.logoImage = preview || undefined;

    const parsed = CompanyUpdateSchemaPayload.safeParse({
      id: company.id,
      ...values,
    });

    if (!parsed.success) return setZodFormErrors(parsed.error, form);
    mutateUpdate(parsed.data);
  };

  return (
    <Form form={form} onFinish={handleFinish} layout="vertical">
      <Row gutter={16}>
        <Col span={24}>
          <Form.Item name="logoImage" label={t("form.logo")}>
            <Dragger
              beforeUpload={() => false}
              fileList={fileList}
              onChange={(info) =>
                handleUploadImageChange({
                  info,
                  setFileList,
                  setPreview,
                })
              }
              maxCount={1}
              accept="image/*"
              showUploadList={false}
              style={{
                padding: 12,
                border: "1px dashed #d9d9d9",
                borderRadius: 8,
                backgroundColor: "#fafafa",
                textAlign: "center",
              }}
            >
              {preview ? (
                <Image
                  src={preview}
                  alt="preview"
                  preview={false}
                  style={{
                    maxHeight: 120,
                    objectFit: "contain",
                    borderRadius: 8,
                  }}
                />
              ) : (
                <div>
                  <InboxOutlined style={{ fontSize: 40, color: "#999" }} />
                  <div style={{ marginTop: 8, fontSize: 14 }}>
                    {t("form.drag")}
                  </div>
                  <div style={{ fontSize: 12, color: "#666", marginTop: 4 }}>
                    {t("form.onlyImage")}
                  </div>
                </div>
              )}
            </Dragger>
          </Form.Item>
        </Col>

        <Col span={12}>
          <Form.Item name="companyName" label={t("form.companyName")}>
            <Input placeholder={t("form.placeholder.companyName")} />
          </Form.Item>
        </Col>

        <Col span={12}>
          <Form.Item name="companyCode" label={t("form.companyCode")}>
            <Input placeholder={t("form.placeholder.companyCode")} />
          </Form.Item>
        </Col>

        <Col span={12}>
          <Form.Item name="companyCategoryId" label={t("form.category")}>
            <Select
              placeholder={t("form.placeholder.category")}
              loading={isLoadingCompanyCategory}
              showSearch
              filterOption={false}
              onSearch={(value) => setSearchCompanyCategory(value)}
              options={companyCategoryOptions}
              notFoundContent={
                isLoadingCompanyCategory ? <Spin size="small" /> : null
              }
            />
          </Form.Item>
        </Col>

        <Col span={12}>
          <Form.Item name="address" label={t("form.address")}>
            <Input placeholder={t("form.placeholder.address")} />
          </Form.Item>
        </Col>

        <Col span={12}>
          <Form.Item name="phoneNumber1" label={t("form.phone1")}>
            <Input placeholder={t("form.placeholder.phone1")} />
          </Form.Item>
        </Col>

        <Col span={12}>
          <Form.Item name="phoneNumber2" label={t("form.phone2")}>
            <Input placeholder={t("form.placeholder.phone2")} />
          </Form.Item>
        </Col>

        <Col span={12}>
          <Form.Item name="fax" label={t("form.fax")}>
            <Input placeholder={t("form.placeholder.fax")} />
          </Form.Item>
        </Col>

        <Col span={12}>
          <Form.Item name="email" label={t("form.email")}>
            <Input placeholder={t("form.placeholder.email")} />
          </Form.Item>
        </Col>

        <Col span={12}>
          <Form.Item name="website" label={t("form.website")}>
            <Input placeholder={t("form.placeholder.website")} />
          </Form.Item>
        </Col>

        <Col span={24}>
          <Form.Item label={t("form.assignUser")}>
            <Select
              mode="multiple"
              placeholder={t("form.placeholder.assignUser")}
              showSearch
              filterOption={false}
              onSearch={(val) => setSearch(val)}
              options={userOptions}
              value={selectedUsers}
              onChange={(val) => {
                setSelectedUsers(val);
                form.setFieldValue("userIds", val);
              }}
              notFoundContent={isLoadingUser ? <Spin size="small" /> : null}
            />
            <Form.Item name="userIds" noStyle>
              <Input type="hidden" />
            </Form.Item>
          </Form.Item>
        </Col>

        <Col span={24}>
          <Button type="primary" block htmlType="submit" loading={isPending}>
            {t("form.update")}
          </Button>
        </Col>
      </Row>
    </Form>
  );
};
