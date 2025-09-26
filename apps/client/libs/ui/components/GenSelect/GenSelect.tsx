import React, { FC } from "react";
import { Select, SelectProps } from "antd";
import { ArrowDownIcon, GlobeIcon } from "../../icons";
import "./gen-select.style.css";
import clsx from "clsx";

interface IGenSelectProps extends SelectProps {}

const GenSelect: FC<IGenSelectProps> = ({ ...restProps }) => {
  return (
    <Select
      {...restProps}
      className={clsx("gen-select", restProps.classNames)}
      variant="borderless"
      placeholder={<GlobeIcon />}
      suffixIcon={<ArrowDownIcon style={{ fontSize: "10px" }} />}
    />
  );
};

export default GenSelect;
