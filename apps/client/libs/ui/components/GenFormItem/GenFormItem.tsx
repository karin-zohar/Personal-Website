import React, { FC } from "react";
import useStore from "@/store/store";
import { Form, FormItemProps } from "antd";
import "./gen-form-item.style.css";
const GenFormItem: FC<FormItemProps> = ({ children, ...restProps }) => {
  const { language } = useStore();
  return (
    <Form.Item
      {...restProps}
      labelAlign={language === "hebrew" ? "right" : "left"}
      colon={false}
    >
      {children}
    </Form.Item>
  );
};

export default GenFormItem;
