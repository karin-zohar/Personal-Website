import { Dictionary } from "@/store/slices/i18n.slice";
import { FormItemProps } from "antd";
import { RuleObject } from "antd/es/form";

export type LocalizedFormItem = Omit<FormItemProps, "label" | "rules"> & {
  label?: Dictionary;
  rules?: (Omit<RuleObject, "message"> & {
    message?: Dictionary;
  })[];
  inputType?: "text" | "text-area" | "number";
};
