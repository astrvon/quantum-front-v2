import {
  Button,
  Col,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Row,
  Select,
} from "antd";
import { useTranslations } from "next-intl";
import React, { useMemo, useState } from "react";

import { RenderSelectOptions } from "@/common/components/renderSelectOptions";
import useGetListCustomerFetch from "@/common/custom/hooks/api/fetcher/customer/useGetListCustomerFetch";
import useGetListVesselTypeFetch from "@/common/custom/hooks/api/fetcher/vessel-type/useGetListVesselTypeFetch";
import useCreateVesselMutation, {
  ICreateVesselMutationPayload,
  VesselCreateSchemaPayload,
} from "@/common/custom/hooks/api/mutation/vessel/useCreateVesselMutation";
import { useDebounce } from "@/common/custom/hooks/share/useDebounce";
import { IRefVessel } from "@/common/interfaces/data/vessel";
import { setZodFormErrors } from "@/common/lib/setZodFormErrors";

const vesselFormFields: {
  name: keyof ICreateVesselMutationPayload;
  type?: "input" | "number" | "date";
  span?: number;
  required?: boolean;
}[] = [
  { name: "imoNumber" },
  { name: "serialNumber" },
  { name: "builtDate", type: "date" },
  { name: "builtShipyard" },
  { name: "vesselCode", required: true },
  { name: "vesselProjectCounter", type: "number" },
  { name: "grossRegisterTonnage", type: "number" },
  { name: "deadweightTonnage", type: "number" },
  { name: "lbp", type: "number" },
  { name: "bmld", type: "number" },
  { name: "hmld", type: "number" },
  { name: "flag" },
  { name: "callsign" },
  { name: "classRegisterNumber" },
  { name: "smsSerialNumber" },
  { name: "partNumber" },
  { name: "lengthOverAll", type: "number" },
  { name: "draftExtreme", type: "number" },
  { name: "fuelTankCapacities", type: "number" },
  { name: "freshWaterTankCapacities", type: "number" },
  { name: "power" },
  { name: "speed" },
  { name: "bollardPull", type: "number" },
  { name: "complement", type: "number" },
];

export interface CreateVesselFormProps {
  onSuccess?: (data: Partial<IRefVessel>) => void;
  enabledFetch?: boolean;
}

const CreateVesselForm = ({
  onSuccess,
  enabledFetch = true,
}: CreateVesselFormProps) => {
  const t = useTranslations("modalVessel");
  const [form] = Form.useForm<ICreateVesselMutationPayload>();

  const [searchVesselType, setSearchVesselType] = useState<string>();
  const [searchCustomer, setSearchCustomer] = useState<string>();
  const debouncedVesselType = useDebounce(searchVesselType);
  const debouncedCustomer = useDebounce(searchCustomer);

  const { mutate, isPending } = useCreateVesselMutation({
    onSuccessCallback: (data) => {
      onSuccess?.(data);
      form.resetFields();
    },
  });

  const handleSubmit = async () => {
    const values = await form.validateFields();
    const parsed = VesselCreateSchemaPayload.safeParse(values);
    if (!parsed.success) return setZodFormErrors(parsed.error, form);
    mutate(parsed.data);
  };

  const { data: vesselTypeData, isPending: loadingVesselType } =
    useGetListVesselTypeFetch({
      params: {
        pagination: { page: 1, take: 25, search: debouncedVesselType },
        filters: { isActive: true },
      },
      enabled: enabledFetch,
    });

  const { data: customerData, isPending: loadingCustomer } =
    useGetListCustomerFetch({
      params: {
        pagination: { page: 1, take: 25, search: debouncedCustomer },
        filters: { isActive: true },
      },
      enabled: enabledFetch,
    });

  const vesselTypeOptions = useMemo(
    () => RenderSelectOptions(vesselTypeData?.data, "name", "id"),
    [vesselTypeData?.data]
  );

  const customerOptions = useMemo(
    () => RenderSelectOptions(customerData?.data, "name", "id"),
    [customerData?.data]
  );

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={handleSubmit}
      style={{ paddingRight: 8 }}
    >
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            name="vesselName"
            label={t("vesselName")}
            rules={[{ required: true }]}
          >
            <Input placeholder={t("vesselName")} />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item name="vesselTypeId" label={t("vesselType")}>
            <Select
              placeholder={t("selectVesselType")}
              showSearch
              onSearch={setSearchVesselType}
              filterOption={false}
              loading={loadingVesselType}
              notFoundContent={null}
            >
              {vesselTypeOptions}
            </Select>
          </Form.Item>
        </Col>

        {vesselFormFields.map(({ name, type, span = 12, required = false }) => (
          <Col span={span} key={name}>
            <Form.Item name={name} label={t(name)} rules={[{ required }]}>
              {type === "number" ? (
                <InputNumber style={{ width: "100%" }} placeholder={t(name)} />
              ) : type === "date" ? (
                <DatePicker style={{ width: "100%" }} placeholder={t(name)} />
              ) : (
                <Input placeholder={t(name)} />
              )}
            </Form.Item>
          </Col>
        ))}

        <Col span={24}>
          <Form.Item name="customerId" label={t("customer")}>
            <Select
              placeholder={t("selectCustomer")}
              showSearch
              onSearch={setSearchCustomer}
              filterOption={false}
              loading={loadingCustomer}
              notFoundContent={null}
            >
              {customerOptions}
            </Select>
          </Form.Item>
        </Col>
      </Row>

      <Button
        type="primary"
        block
        htmlType="submit"
        loading={isPending}
        style={{ marginTop: 16 }}
      >
        {t("submit.add")}
      </Button>
    </Form>
  );
};

export default CreateVesselForm;
