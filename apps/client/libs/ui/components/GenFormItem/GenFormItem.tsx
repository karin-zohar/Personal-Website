import React, { FC } from "react";
import { Form } from "antd";
import { LocalizedFormItem } from "./GenFormItem.types";
import useStore from "@/store/store";
import { Rule } from "antd/es/form";
import "./gen-form-item.style.css";

const GenFormItem: FC<LocalizedFormItem> = ({
  children,
  label,
  rules,
  ...restProps
}) => {
  const { getLocalizedText } = useStore();
  return (
    <Form.Item
      {...restProps}
      colon={false}
      label={label && getLocalizedText(label)}
      rules={
        rules
          ? (rules.map((rule) => ({
              ...rule,
              message: rule.message && getLocalizedText(rule.message),
            })) as Rule[])
          : undefined
      }
    >
      {children}
    </Form.Item>
  );
};

export default GenFormItem;
