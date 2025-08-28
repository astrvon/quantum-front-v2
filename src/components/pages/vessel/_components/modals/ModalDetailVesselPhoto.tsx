"use client";

import { Button, Tag } from "antd";
import { useTranslations } from "next-intl";
import { useMemo, useState } from "react";
import { FaCamera } from "react-icons/fa";

import useGetListVesselPhotoFetch from "@/common/custom/hooks/api/fetcher/vessel/useGetListVesselPhotoFetch";
import useDeleteVesselPhotoMutation from "@/common/custom/hooks/api/mutation/vessel/useDeleteVesselPhoto";
import { IRefVesselPhoto } from "@/common/interfaces/data/vesselPhoto";
import {
  ImageSliderModal,
  IImageData,
} from "@/components/shared/ImageSliderModal";

import { ModalAddVesselPhoto } from "./ModalAddVesselPhoto";
import { ModalUpdateVesselPhoto } from "./ModalUpdateVesselPhoto";

interface ModalDetailVesselPhotoProps {
  vesselId: string;
  count: number;
}

export const ModalDetailVesselPhoto = ({
  vesselId,
  count,
}: ModalDetailVesselPhotoProps) => {
  const t = useTranslations("vesselPhotoPage");

  const [isModal, setIsModal] = useState(false);
  const [isAddModal, setIsAddModal] = useState(false);
  const [isUpdateModal, setIsUpdateModal] = useState(false);

  const [selectedVesselPhoto, setSelectedVesselPhoto] = useState<
    IRefVesselPhoto | undefined
  >(undefined);

  const { data: vesselPhoto, isLoading } = useGetListVesselPhotoFetch({
    params: {
      pagination: { page: 1, take: 25 },
      filters: { vesselId, isActive: true },
    },
    enabled: isModal,
  });

  const { mutate: mutateDelete } = useDeleteVesselPhotoMutation();

  const photoItems: IImageData[] = useMemo(() => {
    return (
      vesselPhoto?.data?.map((photo) => ({
        id: photo.id,
        url: photo.base64,
        name: photo.name,
        description: photo.description,
        takenAt: photo.takenAt,
      })) || []
    );
  }, [vesselPhoto?.data]);

  return (
    <>
      <Button
        onClick={() => setIsModal(true)}
        type="link"
        style={{ display: "flex", alignItems: "center", gap: 8 }}
      >
        <FaCamera size={18} color="#1677ff" />
        <Tag color="processing" style={{ margin: 0 }}>
          {t("photos", { count })}
        </Tag>
      </Button>

      <ImageSliderModal
        isLoading={isLoading}
        open={isModal}
        onCancelAction={() => setIsModal(false)}
        images={photoItems}
        onDelete={(photoId) => mutateDelete({ ids: [photoId] })}
        onAdd={() => setIsAddModal(true)}
        onUpdate={(photoId) => {
          const foundPhoto = vesselPhoto?.data.find((p) => p.id === photoId);
          if (!foundPhoto) return;
          setSelectedVesselPhoto(foundPhoto);
          setIsUpdateModal(true);
        }}
      />

      <ModalAddVesselPhoto
        open={isAddModal}
        onClose={() => setIsAddModal(false)}
        vesselId={vesselId}
      />

      <ModalUpdateVesselPhoto
        open={isUpdateModal}
        onClose={() => {
          setIsUpdateModal(false);
          setSelectedVesselPhoto(undefined);
        }}
        vesselId={vesselId}
        vesselPhoto={selectedVesselPhoto}
      />
    </>
  );
};
