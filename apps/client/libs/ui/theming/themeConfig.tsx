import { ThemeConfig } from "antd";
import { colorPalette as colors } from "./colorPalette";

const baseTheme: ThemeConfig = {
  token: {
    fontFamily: '"Outfit", "Assistant", Arial, sans-serif',
  },
};

export const colorConfig: Record<"light" | "dark", ThemeConfig> = {
  light: {
    token: {
      ...baseTheme.token,
      colorTextBase: colors["teal-800"],
      colorBgBase: colors["cream-100"],
    },
  },
  dark: {
    token: {
      ...baseTheme.token,
      colorTextBase: colors["cream-100"],
      colorBgBase: colors["teal-800"],
    },
  },
};
