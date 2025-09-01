import { BsGrid, BsList } from "react-icons/bs";
import {
  FaBuilding,
  FaCog,
  FaCreditCard,
  FaUserCircle,
  FaUserCog,
  FaUserLock,
  FaUsers,
  FaUserShield,
} from "react-icons/fa";
import { RiShip2Line } from "react-icons/ri";
import { TbBrandDatabricks } from "react-icons/tb";

import type { MenuProps } from "antd";

export const getSidebarItems = (): MenuProps["items"] => {
  return [
    {
      type: "group",
      label: "Main",
      children: [
        { key: "/", icon: <BsGrid />, label: "Dashboard" },
        {
          key: "/customers",
          icon: <FaUsers />,
          label: "Customers",
          children: [
            { key: "/customers", icon: <TbBrandDatabricks />, label: "List" },
            { key: "/customers/type", icon: <BsList />, label: "Type" },
          ],
        },
        { key: "/company", icon: <FaBuilding />, label: "Company" },
        {
          key: "/vessels",
          icon: <RiShip2Line />,
          label: "Vessel",
          children: [
            { key: "/vessel", icon: <TbBrandDatabricks />, label: "List" },
            { key: "/vessel/type", icon: <BsList />, label: "Type" },
          ],
        },
        {
          key: "/users",
          icon: <FaUserShield />,
          label: "Users",
          children: [
            {
              key: "/users/accounts",
              icon: <FaUserCog />,
              label: "Accounts",
            },
            { key: "/users/roles", icon: <FaUserLock />, label: "Roles" },
            {
              key: "/users/bank-type",
              icon: <FaCreditCard />,
              label: "Bank Type",
            },
          ],
        },
      ],
    },
    {
      type: "group",
      label: "Settings",
      children: [
        {
          key: "/settings",
          icon: <FaCog />,
          label: "Settings",
          children: [
            {
              key: "/settings/profile",
              icon: <FaUserCircle />,
              label: "Profile",
            },
          ],
        },
      ],
    },
  ];
};
