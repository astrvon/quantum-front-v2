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
import dayjs from "dayjs";
import { useTranslations } from "next-intl";
import React, { useEffect, useMemo, useState } from "react";

import { RenderSelectOptions } from "@/common/components/renderSelectOptions";
import useGetListCustomerFetch from "@/common/custom/hooks/api/fetcher/customer/useGetListCustomerFetch";
import useGetListVesselTypeFetch from "@/common/custom/hooks/api/fetcher/vessel-type/useGetListVesselTypeFetch";
import useUpdateVesselMutation, {
  IUpdateVesselMutationPayload,
  VesselUpdateSchemaPayload,
} from "@/common/custom/hooks/api/mutation/vessel/useUpdateVesselMutation";
import { useDebounce } from "@/common/custom/hooks/share/useDebounce";
import { IRefVessel } from "@/common/interfaces/data/vessel";
import { setZodFormErrors } from "@/common/lib/setZodFormErrors";

const vesselFormFields: {
  name: keyof IUpdateVesselMutationPayload;
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

export interface IUpdateVesselFormProps {
  onSuccess?: (data: Partial<IRefVessel>) => void;
  enabledFetch?: boolean;
  vessel: IRefVessel;
}

const UpdateVesselForm = ({
  onSuccess,
  enabledFetch = true,
  vessel,
}: IUpdateVesselFormProps) => {
  const t = useTranslations("modalVessel");
  const [form] = Form.useForm<Omit<IUpdateVesselMutationPayload, "id">>();

  const [searchVesselType, setSearchVesselType] = useState<string>();
  const [searchCustomer, setSearchCustomer] = useState<string>();
  const debouncedVesselType = useDebounce(searchVesselType);
  const debouncedCustomer = useDebounce(searchCustomer);

  const { mutate: mutateUpdate, isPending } = useUpdateVesselMutation({
    onSuccessCallback: (data) => {
      onSuccess?.(data);
      form.resetFields();
    },
  });

  const { data: vesselTypeData, isPending: isPendingVesselType } =
    useGetListVesselTypeFetch({
      params: {
        pagination: { page: 1, take: 25, search: debouncedVesselType },
        filters: { isActive: true },
      },
      enabled: enabledFetch,
    });

  const { data: customerData, isPending: isPendingCustomer } =
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

  const handleFinish = async () => {
    const values = await form.validateFields();

    const cleaned = Object.fromEntries(
      Object.entries({
        id: vessel.id,
        ...values,
      }).filter(([_, value]) => !!value || value === "")
    );

    const parsed = VesselUpdateSchemaPayload.safeParse(cleaned);
    if (!parsed.success) return setZodFormErrors(parsed.error, form);
    mutateUpdate(parsed.data);
  };

  useEffect(() => {
    form.setFieldsValue({
      vesselName: vessel.vessel_name,
      imoNumber: vessel.imo_number,
      serialNumber: vessel.serial_number,
      builtDate: vessel.built_date ? dayjs(vessel.built_date) : undefined,
      builtShipyard: vessel.built_shipyard,
      vesselCode: vessel.vessel_code,
      vesselProjectCounter: vessel.vessel_project_counter
        ? Number(vessel.vessel_project_counter)
        : undefined,
      grossRegisterTonnage: vessel.gross_register_tonnage,
      deadweightTonnage: vessel.deadweight_tonnage,
      lbp: vessel.lbp,
      bmld: vessel.bmld,
      hmld: vessel.hmld,
      flag: vessel.flag,
      callsign: vessel.callsign,
      classRegisterNumber: vessel.class_register_number,
      smsSerialNumber: vessel.sms_serial_number,
      partNumber: vessel.part_number,
      lengthOverAll: vessel.length_over_all,
      draftExtreme: vessel.draft_extreme,
      fuelTankCapacities: vessel.fuel_tank_capacities,
      freshWaterTankCapacities: vessel.fresh_water_tank_capacities,
      power: vessel.power,
      speed: vessel.speed,
      bollardPull: vessel.bollard_pull,
      complement: vessel.complement,
      vesselTypeId: vessel.vesselTypeId,
      customerId: vessel.customerId,
    });
  }, [form, vessel]);

  return (
    <Form
      form={form}
      onFinish={handleFinish}
      layout="vertical"
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
              loading={isPendingVesselType}
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
              loading={isPendingCustomer}
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
        {t("submit.update")}
      </Button>
    </Form>
  );
};

export default UpdateVesselForm;
