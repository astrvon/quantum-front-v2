import type { MenuProps } from "antd";

export const flattenMenu = (items: MenuProps["items"]) => {
  const result: {
    key: string;
    label: string;
    parent?: string;
    isChild?: boolean;
  }[] = [];

  const traverse = (arr: MenuProps["items"], parentLabel?: string) => {
    arr?.forEach((item) => {
      if (!item) return;

      if (item.type === "group") {
        traverse(item.children, undefined);
        return;
      }

      if ("children" in item && item.children) {
        traverse(item.children, String(item.label));
      } else if ("label" in item && item.key) {
        result.push({
          key: String(item.key),
          label: String(item.label),
          parent: parentLabel,
          isChild: !!parentLabel,
        });
      }
    });
  };

  traverse(items);
  return result;
};
