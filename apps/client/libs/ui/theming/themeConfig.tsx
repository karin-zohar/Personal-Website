import { ThemeConfig } from "antd";
import { colorPalette as colors } from "./colorPalette";

export const colorConfig: Record<"light" | "dark", ThemeConfig> = {
  light: {
    token: {
      colorTextBase: colors["teal-800"],
      colorBgBase: colors["cream-100"],
    },
  },
  dark: {
    token: {
      colorTextBase: colors["cream-100"],
      colorBgBase: colors["teal-800"],
    },
  },
};
