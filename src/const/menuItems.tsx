import type { MenuProps } from "antd";
import {
  AppstoreOutlined,
  MailOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";

type MenuItem = Required<MenuProps>['items'][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: "group"
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
    type,
  } as MenuItem;
}

export const menuItems: MenuProps["items"] = [
  getItem("Визуализация", "sub1", <MailOutlined />, [
    getItem(<Link to="/operator">Просмотр данных</Link>, "1"),
    getItem(<Link to="/operator">Экспорт</Link>, "2"),
  ]),

  getItem("Данные", "sub2", <AppstoreOutlined />, [
    getItem(<Link to="/import">Импорт</Link>, "5"),
    getItem(<Link to="/operator">Миграции</Link>, "11"),
  ]),

  getItem("Админ", "sub4", <SettingOutlined />, [
    getItem(<Link to="/collection">Коллекции</Link>, "9"),
    getItem(<Link to="/operator">Словарь</Link>, "10"),
  ]),
];
