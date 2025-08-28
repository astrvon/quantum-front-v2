"use client";

import {
  CalendarFilled,
  LeftOutlined,
  RightOutlined,
  PlusOutlined,
  DeleteOutlined,
  EditOutlined,
} from "@ant-design/icons";
import {
  Carousel,
  Modal,
  Image,
  Button,
  Typography,
  Empty,
  Flex,
  Spin,
} from "antd";
import { CarouselRef } from "antd/es/carousel";
import { useRef, useState } from "react";

import { IDateFormatType } from "@/common/interfaces/enum/dateFormatType.enum";
import { formatDate } from "@/common/lib/dayjsDateFormat";

const { Text, Paragraph } = Typography;

export interface IImageData {
  id: string;
  url: string;
  name?: string;
  description?: string;
  takenAt?: string | Date;
}

export interface ImageSliderModalProps {
  title?: string;
  open: boolean;
  onCancelAction: () => void;
  images: IImageData[];
  isLoading: boolean;
  onAdd?: () => void;
  onDelete?: (photoId: string) => void;
  onUpdate?: (photoId: string) => void;
}

export function ImageSliderModal({
  open,
  onCancelAction,
  images,
  isLoading,
  onDelete,
  onAdd,
  onUpdate,
}: ImageSliderModalProps) {
  const carouselRef = useRef<CarouselRef>(null);
  const [currentSlide, setCurrentSlide] = useState(0);

  return (
    <Modal
      open={open}
      title={
        images && images.length > 0
          ? images[currentSlide]?.name || "No name"
          : "No Photos"
      }
      onCancel={onCancelAction}
      footer={null}
      width={900}
      centered
      destroyOnHidden
    >
      <div style={{ height: 560, position: "relative" }}>
        {isLoading && (
          <Flex
            style={{
              width: "100%",
              height: "inherit",
              flex: 1,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Spin />
          </Flex>
        )}

        {images && images.length > 0 ? (
          <div style={{ position: "relative" }}>
            <Carousel
              ref={carouselRef}
              dotPosition="bottom"
              autoplay
              swipeToSlide
              draggable
              fade
              beforeChange={(_, next) => setCurrentSlide(next)}
              style={{ width: "100%", minHeight: 500, maxHeight: 500 }}
            >
              {images.map((img, index) => (
                <div key={index} style={{ position: "relative" }}>
                  <Button
                    type="text"
                    shape="circle"
                    icon={<EditOutlined />}
                    style={{
                      position: "absolute",
                      top: 12,
                      right: 48,
                      backgroundColor: "rgba(0,0,0,0.5)",
                      color: "#fff",
                      zIndex: 5,
                    }}
                    onClick={() => onUpdate?.(img.id)}
                  />

                  <Button
                    type="text"
                    danger
                    shape="circle"
                    icon={<DeleteOutlined />}
                    style={{
                      position: "absolute",
                      top: 12,
                      right: 12,
                      backgroundColor: "rgba(0,0,0,0.5)",
                      color: "#fff",
                      zIndex: 5,
                    }}
                    onClick={() => onDelete?.(img.id)}
                  />

                  <Image
                    loading="lazy"
                    src={img.url}
                    width="100%"
                    height={500}
                    style={{
                      borderRadius: "14px",
                      objectFit: "cover",
                      display: "block",
                      margin: "0 auto",
                    }}
                    preview={false}
                    alt={img.name || `Slide ${index + 1}`}
                  />

                  <div
                    style={{
                      position: "absolute",
                      bottom: 4,
                      left: 0,
                      width: "100%",
                      padding: "16px",
                      background:
                        "linear-gradient(to top, rgba(0,0,0,0.8), rgba(0,0,0,0.3))",
                      borderRadius: "0 0 14px 14px",
                      color: "#fff",
                    }}
                  >
                    <Text strong style={{ fontSize: 18, color: "#fff" }}>
                      {img.name || "No name"}
                    </Text>
                    <Paragraph style={{ margin: "4px 0", color: "#ddd" }}>
                      {img.description || "-"}
                    </Paragraph>
                    {img.takenAt && (
                      <Text style={{ fontSize: 12, color: "#bbb" }}>
                        <CalendarFilled />{" "}
                        {formatDate(img.takenAt, IDateFormatType.SHORT)}
                      </Text>
                    )}
                  </div>
                </div>
              ))}
            </Carousel>

            <Button
              type="text"
              onClick={() => carouselRef.current?.prev()}
              style={navButtonStyle("left")}
            >
              <LeftOutlined style={{ fontSize: 20 }} />
            </Button>

            <Button
              type="text"
              onClick={() => carouselRef.current?.next()}
              style={navButtonStyle("right")}
            >
              <RightOutlined style={{ fontSize: 20 }} />
            </Button>

            <div
              style={{
                display: "flex",
                justifyContent: "center",
                gap: 8,
                marginTop: 12,
                flexWrap: "wrap",
                maxHeight: 50,
                minHeight: 50,
              }}
            >
              {images.map((img, idx) => (
                <div
                  key={idx}
                  onClick={() =>
                    carouselRef.current?.goTo(
                      images.findIndex((i) => i.id === img.id)
                    )
                  }
                  style={{
                    border:
                      images.findIndex((i) => i.id === img.id) === currentSlide
                        ? "2px solid #1890ff"
                        : "2px solid transparent",
                    borderRadius: 6,
                    cursor: "pointer",
                    height: 50,
                    transition: "transform 0.2s ease, border 0.3s ease",
                  }}
                >
                  <Image
                    loading="lazy"
                    src={img.url}
                    alt={img.name || `Thumbnail ${idx + 1}`}
                    width={70}
                    height="100%"
                    style={{
                      objectFit: "cover",
                      borderRadius: 4,
                      display: "block",
                    }}
                    preview={false}
                  />
                </div>
              ))}

              <div
                onClick={onAdd}
                style={{
                  width: 70,
                  height: 50,
                  border: "2px dashed #ccc",
                  borderRadius: 4,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.borderColor = "#1890ff")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.borderColor = "#ccc")
                }
              >
                <PlusOutlined style={{ color: "#999", fontSize: 18 }} />
              </div>
            </div>
          </div>
        ) : (
          <div
            style={{
              display: !isLoading ? "flex" : "none",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              textAlign: "center",
              height: "100%",
              width: "100%",
              position: "absolute",
            }}
          >
            <div
              style={{
                width: "98%",
                height: "80%",
                border: "2px dashed  #ccc",
                borderRadius: "6px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Empty
                image={Empty.PRESENTED_IMAGE_SIMPLE}
                description={
                  <span style={{ color: "#888" }}>No images added</span>
                }
              />
            </div>

            <div
              onClick={onAdd}
              style={{
                marginTop: 16,
                width: 60,
                height: 40,
                border: "2px dashed #ccc",
                borderRadius: 4,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                transition: "all 0.2s ease",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.borderColor = "#1890ff")
              }
              onMouseLeave={(e) => (e.currentTarget.style.borderColor = "#ccc")}
            >
              <PlusOutlined style={{ color: "#999", fontSize: 18 }} />
            </div>
          </div>
        )}
      </div>
    </Modal>
  );
}

function navButtonStyle(position: "left" | "right") {
  return {
    position: "absolute" as const,
    top: "50%",
    [position]: 12,
    transform: "translateY(-50%)",
    zIndex: 10,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    color: "#fff",
    border: "none",
    borderRadius: "50%",
    width: 36,
    height: 36,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backdropFilter: "blur(4px)",
    transition: "all 0.2s ease",
    cursor: "pointer",
    boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
  };
}
