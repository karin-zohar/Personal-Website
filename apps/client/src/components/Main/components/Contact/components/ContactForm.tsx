import React, { useState } from "react";
import { Button, Form, Input } from "antd";
import useStore from "@/store/store";
import GenFormItem from "@/libs/ui/components/GenFormItem/GenFormItem";
import { Rule } from "antd/es/form";

const ContactForm = () => {
  const { getLocalizedText } = useStore();
  const [form] = Form.useForm();
  const [isValidated, setIsValidated] = useState(false);

  const formFields = [
    {
      key: "name",
      label: { english: "Name", hebrew: "שם" },
      required: true,
      rules: [
        {
          required: true,
          message: getLocalizedText({
            english: "Please enter your name",
            hebrew: "נא להזין שם",
          }),
        },
      ],
    },
    {
      key: "email",
      label: { english: "Email", hebrew: 'דוא"ל' },
      required: true,
      rules: [
        {
          required: true,
          message: getLocalizedText({
            english: "Please enter your email",
            hebrew: 'נא להזין כתובת דוא"ל',
          }),
        },
        {
          type: "email",
          message: getLocalizedText({
            english: "Please enter a valid email address",
            hebrew: 'נא להזין כתובת דוא"ל תקינה',
          }),
        },
      ],
    },
    {
      key: "company-name",
      label: { english: "Company Name", hebrew: "שם החברה" },
      required: false,
    },
    {
      key: "phone",
      label: { english: "Phone number", hebrew: "מספר טלפון" },
      required: false,
      rules: [
        {
          type: "number",
          message: getLocalizedText({
            english: "Please enter a valid phone number",
            hebrew: "נא להזין מספר טלפון תקין",
          }),
        },
      ],
    },
    {
      key: "message",
      label: { english: "Message", hebrew: "הודעה" },
      required: true,
      rules: [
        {
          required: true,
          message: getLocalizedText({
            english: "Please enter a message",
            hebrew: "נא להזין הודעה",
          }),
        },
      ],
      inputType: "text-area",
    },
  ];

  const handleValuesChange = async () => {
    try {
      await form.validateFields();
      setIsValidated(true);
    } catch {
      setIsValidated(false);
    }
  };

  const handleFinish = (values: any) => {
    console.log("Form submitted:", values);
  };

  return (
    <Form
      form={form}
      className="contact-form"
      layout="vertical"
      onValuesChange={handleValuesChange}
      onFinish={handleFinish}
    >
      {formFields.map((field) => (
        <GenFormItem
          key={field.key}
          name={field.key}
          label={getLocalizedText(field.label)}
          required={field.required}
          rules={(field?.rules as Rule[]) || undefined}
          validateTrigger="onBlur"
        >
          {field.inputType === "text-area" ? (
            <Input.TextArea rows={4} />
          ) : (
            <Input />
          )}
        </GenFormItem>
      ))}

      <Form.Item shouldUpdate>
        {() => (
          <Button
            type="primary"
            htmlType="submit"
            className="submit-button"
            block
            disabled={!isValidated}
          >
            {getLocalizedText({ english: "Send", hebrew: "שליחה" })}
          </Button>
        )}
      </Form.Item>
    </Form>
  );
};

export default ContactForm;
