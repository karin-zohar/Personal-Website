import React, { FC, ReactNode } from "react";
import useStore from "@/store/store";
import clsx from "clsx";
import "./main-layout.style.css";
import Header from "../Header/Header";

type MainLayoutProps = {
  children: ReactNode;
};

const MainLayout: FC<MainLayoutProps> = ({ children }) => {
  const { isLightTheme } = useStore();
  return (
    <div
      className={clsx("main-layout", "theme", isLightTheme ? "light" : "dark")}
    >
      <Header />
      <main className="gutter">{children}</main>
    </div>
  );
};

export default MainLayout;
