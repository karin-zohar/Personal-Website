import React, { FC, ReactNode } from "react";
import useStore from "@/store/store";
import clsx from "clsx";
import "./main-layout.style.css";
import Header from "../Header/Header";
import { ConfigProvider } from "antd";
import { colorConfig } from "@/libs/ui/theming/themeConfig";

type MainLayoutProps = {
  children: ReactNode;
};

const MainLayout: FC<MainLayoutProps> = ({ children }) => {
  const { theme, language } = useStore();
  const direction = language === "hebrew" ? "rtl" : "ltr";
  return (
    <ConfigProvider direction={direction} theme={colorConfig[theme]}>
      <div className={clsx("main-layout", "theme", theme, direction)}>
        <Header />
        <main className="gutter">{children}</main>
      </div>
    </ConfigProvider>
  );
};

export default MainLayout;
