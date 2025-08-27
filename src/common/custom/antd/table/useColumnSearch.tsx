import { SearchOutlined } from "@ant-design/icons";
import { Flex, Input } from "antd";
import debounce from "lodash/debounce";
import { useRef, useEffect, SetStateAction, Dispatch } from "react";
import Highlighter from "react-highlight-words";

import { IPagination } from "@/common/interfaces/pagination";
import { DEFAULT_PAGINATION } from "@/common/var/pagination";

import type { InputRef } from "antd";
import type { FilterDropdownProps, ColumnType } from "antd/es/table/interface";

export const useColumnSearch = <T extends object>({
  setPagination,
}: {
  setPagination: Dispatch<SetStateAction<IPagination>>;
}) => {
  const searchText = useRef<Record<string, string>>({});
  const searchInput = useRef<InputRef>(null);

  const debouncedSetSearchText = useRef(
    debounce(
      (
        dataIndex: keyof T,
        value: string,
        confirm: FilterDropdownProps["confirm"]
      ) => {
        searchText.current[String(dataIndex)] = value;
        confirm({ closeDropdown: false });
        setPagination(DEFAULT_PAGINATION);
      },
      300
    )
  ).current;

  useEffect(() => {
    return () => {
      debouncedSetSearchText.cancel();
    };
  }, [debouncedSetSearchText]);

  const getColumnSearchProps = (
    dataIndex: keyof T,
    placeholder: string,
    originalRender?: ColumnType<T>["render"] // Accept the original render function
  ): ColumnType<T> => ({
    filterDropdown: ({ setSelectedKeys, confirm }) => (
      <div
        style={{ padding: 8, minWidth: 250 }}
        onKeyDown={(e) => e.stopPropagation()}
      >
        <strong style={{ display: "block", marginBottom: 4 }}>
          Search {placeholder}:
        </strong>
        <Flex gap={8}>
          <Input
            ref={searchInput}
            placeholder={`Search ${placeholder}`}
            defaultValue={searchText.current[String(dataIndex)]?.trim() || ""}
            onChange={(e) => {
              const trimmedValue = e.target.value.replace(/^\s+|\s+$/g, ""); // Trim all leading & trailing spaces
              setSelectedKeys(trimmedValue ? [trimmedValue] : []);
              debouncedSetSearchText(dataIndex, trimmedValue, confirm);
            }}
            allowClear
            style={{ height: 32, width: "100%" }}
          />
        </Flex>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined style={{ color: filtered ? "#1677ff" : undefined }} />
    ),
    onFilter: (value, record) =>
      !!record[dataIndex]
        ?.toString()
        .toLowerCase()
        .includes((value as string).toLowerCase()),
    filterDropdownProps: {
      onOpenChange(open) {
        if (open) {
          setTimeout(() => searchInput.current?.select(), 100);
        }
      },
    },
    render: (text, record, index) => {
      if (searchText.current[String(dataIndex)]) {
        const Text = (
          <Highlighter
            highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
            searchWords={[searchText.current[String(dataIndex)]]}
            autoEscape
            textToHighlight={text ? text.toString() : ""}
          />
        );
        return originalRender ? originalRender(Text, record, index) : Text;
      }
      return originalRender ? originalRender(text, record, index) : text;
    },
  });

  return { getColumnSearchProps, searchText: searchText.current as Partial<T> };
};
