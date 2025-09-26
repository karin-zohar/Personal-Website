import React, { FC } from "react";
import { Select, SelectProps } from "antd";
import { ArrowDownIcon, GlobeIcon } from "../icons";

interface IGenSelectProps extends SelectProps {}

const GenSelect: FC<IGenSelectProps> = ({ ...restProps }) => {
  return (
    <Select
      variant="borderless"
      placeholder={<GlobeIcon />}
      suffixIcon={<ArrowDownIcon style={{ fontSize: "10px" }} />}
      {...restProps}
    />
  );
};

export default GenSelect;
