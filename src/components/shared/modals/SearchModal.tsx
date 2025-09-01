"use client";

import { SearchOutlined } from "@ant-design/icons";
import { Modal, Input, Typography, Flex, List, Tag, Button } from "antd";
import { useRouter } from "next/navigation";
import React, { useState, useMemo } from "react";
import { BsSearch } from "react-icons/bs";

import { getSidebarItems } from "@/common/components/SidebarItems";
import { flattenMenu } from "@/common/helper/flattenMenu";
import { useRecentStore } from "@/contexts/store/recentStore";

export default function SearchModal() {
  const [isModal, setIsModal] = useState<boolean>(false);
  const [query, setQuery] = useState<string | undefined>(undefined);
  const { recent, addRecent, removeRecent } = useRecentStore();
  const router = useRouter();

  const menuItems = useMemo(() => flattenMenu(getSidebarItems()), []);

  const filtered = menuItems.filter((item) =>
    [item.label, item.parent]
      .filter(Boolean)
      .some((text) =>
        (text || "").toLowerCase().includes(query?.toLowerCase() || ""),
      ),
  );

  const handleClick = (item: { key: string; label: string }) => {
    router.push(item.key);
    setIsModal(false);
    addRecent(item);
    setQuery(undefined);
  };

  const handleCancel = () => {
    setIsModal(false);
    setQuery(undefined);
  };

  return (
    <>
      <Button
        className="icon-hover"
        onClick={() => setIsModal(true)}
        icon={<BsSearch />}
        type="link"
      />
      <Modal
        open={isModal}
        onCancel={handleCancel}
        footer={null}
        closable={false}
        width={500}
        styles={{ content: { overflow: "hidden" } }}
      >
        <>
          <Input
            placeholder="Search page..."
            prefix={<SearchOutlined style={{ color: "#999" }} />}
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            style={{ marginBottom: 12 }}
          />

          {recent.length > 0 && (
            <>
              <Typography.Text style={{ fontSize: 12 }} type="secondary">
                Recent searches
              </Typography.Text>
              <Flex wrap gap="small" style={{ margin: "8px 0 12px" }}>
                {recent.map((item) => (
                  <Tag
                    key={item.key}
                    closable
                    style={{ userSelect: "none", cursor: "pointer" }}
                    onClick={() => handleClick(item)}
                    onClose={(e) => {
                      e.stopPropagation();
                      removeRecent(item.key);
                    }}
                  >
                    {item.label}
                  </Tag>
                ))}
              </Flex>
            </>
          )}
          <Typography.Text style={{ fontSize: 12 }} type="secondary">
            Menu (Page)
          </Typography.Text>
          <List
            style={{ maxHeight: 300, overflowY: "auto", marginTop: 8 }}
            className=".custom-scrollbar"
            dataSource={filtered}
            locale={{ emptyText: "No results found" }}
            renderItem={(item) => (
              <List.Item
                style={{
                  cursor: "pointer",
                  padding: "8px 12px",
                }}
                onClick={() => handleClick(item)}
              >
                {item.isChild ? `${item.parent} - ${item.label}` : item.label}
              </List.Item>
            )}
          />
        </>
      </Modal>
    </>
  );
}
