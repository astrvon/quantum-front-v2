import { CheckCircleFilled, CloseCircleFilled } from "@ant-design/icons";
import { Button, Card, Flex, Modal, Tag } from "antd";
import { useTranslations } from "next-intl";
import React, { useState } from "react";
import { GiShipBow } from "react-icons/gi";

import { IRefVessel } from "@/common/interfaces/data/vessel";
import { formatDate } from "@/common/lib/dayjsDateFormat";
import DocElement from "@/components/shared/DocElement";

interface IModalDetailVesselProps {
  vessel?: IRefVessel;
  buttonText?: string;
}

const ModalDetailVessel = ({ vessel, buttonText }: IModalDetailVesselProps) => {
  const t = useTranslations("modalDetailVessel");
  const [isModal, setIsModal] = useState(false);

  return (
    <>
      <Button
        type="link"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: 8,
        }}
        onClick={() => setIsModal(true)}
      >
        <Tag color="processing" style={{ margin: 0 }}>
          {buttonText || "-"}
        </Tag>

        <GiShipBow size={18} />
      </Button>
      <Modal
        open={isModal}
        onCancel={() => setIsModal(false)}
        footer={null}
        destroyOnHidden
        style={{ minWidth: "80vw" }}
        title={<h3>{t("title")}</h3>}
      >
        <Card>
          <Flex justify="space-between">
            <div
              style={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                gap: 10,
              }}
            >
              <DocElement label={t("name")} data={vessel?.vessel_name ?? "-"} />
              <DocElement
                label={t("imoNumber")}
                data={vessel?.imo_number ?? "-"}
              />
              <DocElement
                label={t("serialNumber")}
                data={vessel?.serial_number ?? "-"}
              />
              <DocElement
                label={t("builtDate")}
                data={vessel?.built_date ? formatDate(vessel.built_date) : "-"}
              />
              <DocElement
                label={t("builtShipyard")}
                data={vessel?.built_shipyard ?? "-"}
              />
              <DocElement
                label={t("status")}
                data={
                  <Tag
                    icon={
                      vessel?.is_active ? (
                        <CheckCircleFilled />
                      ) : (
                        <CloseCircleFilled />
                      )
                    }
                    color={vessel?.is_active ? "success" : "error"}
                    style={{ fontWeight: 500 }}
                  >
                    {vessel?.is_active ? t("active") : t("inactive")}
                  </Tag>
                }
              />
              <DocElement
                label={t("vesselCode")}
                data={vessel?.vessel_code ?? "-"}
              />
              <DocElement
                label={t("vesselProjectCounter")}
                data={vessel?.vessel_project_counter ?? "-"}
              />
              <DocElement
                label={t("grossTonnage")}
                data={(vessel?.gross_register_tonnage ?? 0) + " Ton"}
              />
              <DocElement
                label={t("deadweight")}
                data={(vessel?.deadweight_tonnage ?? 0) + " Ton"}
              />
              <DocElement label={t("lbp")} data={vessel?.lbp ?? 0} />
              <DocElement label={t("bmld")} data={vessel?.bmld ?? 0} />
              <DocElement label={t("hmld")} data={vessel?.hmld ?? 0} />
              <DocElement label={t("flag")} data={vessel?.flag ?? "-"} />
            </div>
            <div
              style={{
                minWidth: 400,
                flex: 1,
                display: "flex",
                flexDirection: "column",
                gap: 10,
              }}
            >
              <DocElement
                label={t("callsign")}
                data={vessel?.callsign ?? "-"}
              />
              <DocElement
                label={t("classRegisterNumber")}
                data={vessel?.class_register_number ?? "-"}
              />
              <DocElement
                label={t("smsSerialNumber")}
                data={vessel?.sms_serial_number ?? "-"}
              />
              <DocElement
                label={t("partNumber")}
                data={vessel?.part_number ?? "-"}
              />
              <DocElement
                label={t("lengthOA")}
                data={(vessel?.length_over_all ?? 0) + " M"}
              />
              <DocElement
                label={t("draftExtreme")}
                data={(vessel?.draft_extreme ?? 0) + " M"}
              />
              <DocElement
                label={t("fuelTanksCapacity")}
                data={(vessel?.fuel_tank_capacities ?? 0) + " M³"}
              />
              <DocElement
                label={t("freshWaterTankCapacity")}
                data={(vessel?.fresh_water_tank_capacities ?? 0) + " M³"}
              />
              <DocElement
                label={t("power")}
                data={(vessel?.power ?? "-") + " PS"}
              />
              <DocElement
                label={t("speed")}
                data={(vessel?.speed ?? "-") + " Knots"}
              />
              <DocElement
                label={t("bollardPull")}
                data={(vessel?.bollard_pull ?? 0) + " Ton"}
              />
              <DocElement
                label={t("complement")}
                data={vessel?.complement ?? 0}
              />
              <DocElement
                label={t("customer")}
                data={
                  vessel?.Customer?.name ? (
                    <Tag color="blue-inverse">{vessel.Customer.name}</Tag>
                  ) : (
                    "-"
                  )
                }
              />
              <DocElement
                label={t("type")}
                data={
                  vessel?.VesselType?.name ? (
                    <Tag color="red">{vessel.VesselType.name}</Tag>
                  ) : (
                    "-"
                  )
                }
              />
            </div>
          </Flex>
        </Card>
      </Modal>
    </>
  );
};

export default ModalDetailVessel;
