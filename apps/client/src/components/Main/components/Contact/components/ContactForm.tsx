import React from "react";
import { Button, Form, Input } from "antd";
import useStore from "@/store/store";
import GenFormItem from "@/libs/ui/components/GenFormItem/GenFormItem";

const ContactForm = () => {
  const { getLocalizedText } = useStore();
  const [form] = Form.useForm();

  const formFields = [
    {
      key: "name",
      label: { english: "Name", hebrew: "שם" },
      required: true,
      rules: [],
    },
    {
      key: "email",
      label: { english: "Email", hebrew: 'דוא"ל' },
      required: true,
      rules: [],
    },
    {
      key: "company-name",
      label: { english: "Company Name", hebrew: "שם החברה" },
      required: false,
      rules: [],
    },
    {
      key: "phone",
      label: { english: "Phone number", hebrew: "מספר טלפון" },
      required: false,
      rules: [],
    },
    {
      key: "message",
      label: { english: "Message", hebrew: "הודעה" },
      required: true,
      rules: [],
      inputType: "text-area",
    },
  ];
  return (
    <Form form={form} className="contact-form">
      {formFields.map((field) => (
        <GenFormItem
          key={field.key}
          label={getLocalizedText(field.label)}
          required={field.required}
          layout="vertical"
        >
          {field.inputType === "text-area" ? (
            <Input.TextArea></Input.TextArea>
          ) : (
            <Input />
          )}
        </GenFormItem>
      ))}
      <Button className="submit-button" block>
        {getLocalizedText({ english: "Send", hebrew: "שליחה" })}
      </Button>
    </Form>
  );
};

export default ContactForm;
