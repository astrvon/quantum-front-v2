"use client";

import { InboxOutlined } from "@ant-design/icons";
import {
  Button,
  Col,
  Form,
  Image,
  Input,
  Row,
  Select,
  Spin,
  UploadFile,
} from "antd";
import { DefaultOptionType } from "antd/es/select";
import Dragger from "antd/es/upload/Dragger";
import { useTranslations } from "next-intl";
import React, { useMemo, useState } from "react";

import useGetListCompanyCategoryFetch from "@/common/custom/hooks/api/fetcher/company-category/useGetListCompanyCategoryFetch";
import useGetListUsersFetch from "@/common/custom/hooks/api/fetcher/users/useGetListUsersFetch";
import useCreateCompanyMutation, {
  CompanyCreateSchemaPayload,
  ICreateCompanyMutationPayload,
} from "@/common/custom/hooks/api/mutation/company/useCreateCompanyMutation";
import { useDebounce } from "@/common/custom/hooks/share/useDebounce";
import { handleUploadImageChange } from "@/common/helper/handleUploadImageChange";
import { ICompany } from "@/common/interfaces/data/company";
import { setZodFormErrors } from "@/common/lib/setZodFormErrors";

export interface AddCompanyFormParams {
  onSuccess?: (data: Partial<ICompany>) => void;
  enabledFetch?: boolean;
}

const AddCompanyForm = ({
  onSuccess,
  enabledFetch = true,
}: AddCompanyFormParams) => {
  const t = useTranslations("modalCompany");
  const [form] = Form.useForm<ICreateCompanyMutationPayload>();

  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [preview, setPreview] = useState<string | null>(null);
  const [search, setSearch] = useState<string | undefined>(undefined);
  const [searchCompanyCategory, setSearchCompanyCategory] = useState<
    string | undefined
  >(undefined);

  const searchDebounce = useDebounce(search);
  const searchCompanyCategoryDebounce = useDebounce(searchCompanyCategory);

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

  const { mutate, isPending } = useCreateCompanyMutation({
    onSuccessCallback: (data) => {
      onSuccess?.(data);
      form.resetFields();
      setFileList([]);
      setPreview(null);
    },
  });

  const handleFinish = async () => {
    const values = await form.validateFields();
    values.email = values.email || undefined;
    values.logoImage = preview || undefined;

    const parsed = CompanyCreateSchemaPayload.safeParse(values);
    if (!parsed.success) return setZodFormErrors(parsed.error, form);
    mutate(parsed.data);
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
                  style={{
                    maxHeight: 120,
                    objectFit: "contain",
                    borderRadius: 8,
                  }}
                  preview={false}
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
          <Form.Item
            name="companyName"
            label={t("form.companyName")}
            rules={[
              { required: true, message: t("form.required.companyName") },
            ]}
          >
            <Input placeholder={t("form.placeholder.companyName")} />
          </Form.Item>
        </Col>

        <Col span={12}>
          <Form.Item
            name="companyCode"
            label={t("form.companyCode")}
            rules={[
              { required: true, message: t("form.required.companyCode") },
            ]}
          >
            <Input placeholder={t("form.placeholder.companyCode")} />
          </Form.Item>
        </Col>

        <Col span={12}>
          <Form.Item
            name="companyCategoryId"
            label={t("form.category")}
            rules={[{ required: true, message: t("form.required.category") }]}
          >
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
          <Form.Item
            name="userIds"
            label={t("form.assignUser")}
            rules={[{ required: true, message: t("form.required.assignUser") }]}
          >
            <Select
              mode="multiple"
              placeholder={t("form.placeholder.assignUser")}
              showSearch
              filterOption={false}
              onSearch={(value) => setSearch(value)}
              options={userOptions}
              notFoundContent={isLoadingUser ? <Spin size="small" /> : null}
            />
          </Form.Item>
        </Col>

        <Col span={24}>
          <Button type="primary" block htmlType="submit" loading={isPending}>
            {t("form.create")}
          </Button>
        </Col>
      </Row>
    </Form>
  );
};

export default AddCompanyForm;
