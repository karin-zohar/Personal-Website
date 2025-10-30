import React, { useState } from "react";
import { Button, Form, Input } from "antd";
import useStore from "@/store/store";
import GenFormItem from "@/libs/ui/components/GenFormItem/GenFormItem";
import { LocalizedFormItem } from "@/libs/ui/components/GenFormItem/GenFormItem.types";

const ContactForm = () => {
  const { getLocalizedText } = useStore();
  const [form] = Form.useForm();
  const [isValidated, setIsValidated] = useState(false);

  const formFields: LocalizedFormItem[] = [
    {
      id: "name",
      label: { english: "Name", hebrew: "שם" },
      required: true,
      rules: [
        {
          required: true,
          message: {
            english: "Please enter your name",
            hebrew: "נא להזין שם",
          },
        },
      ],
    },
    {
      id: "email",
      label: { english: "Email", hebrew: 'דוא"ל' },
      required: true,
      rules: [
        {
          required: true,
          message: {
            english: "Please enter your email",
            hebrew: 'נא להזין כתובת דוא"ל',
          },
        },
        {
          type: "email",
          message: {
            english: "Please enter a valid email address",
            hebrew: 'נא להזין כתובת דוא"ל תקינה',
          },
        },
      ],
    },
    {
      id: "company",
      label: { english: "Company Name", hebrew: "שם החברה" },
      required: false,
    },
    {
      id: "phone",
      label: { english: "Phone number", hebrew: "מספר טלפון" },
      required: false,
      rules: [
        {
          pattern: /^\+?[0-9\s\-()]{7,15}$/,
          message: {
            english: "Please enter a valid phone number",
            hebrew: "נא להזין מספר טלפון תקין",
          },
        },
      ],
    },
    {
      id: "message",
      label: { english: "Message", hebrew: "הודעה" },
      required: true,
      rules: [
        {
          required: true,
          message: {
            english: "Please enter a message",
            hebrew: "נא להזין הודעה",
          },
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

  const handleFinish = async (values: any) => {
    try {
      const res = await fetch("http://localhost:3000/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      if (res.ok) {
        console.log("Message sent successfully");
        form.resetFields();
        setIsValidated(false);
        // optionally show a success message via antd
        console.log(
          getLocalizedText({
            english: "Message sent!",
            hebrew: "ההודעה נשלחה!",
          })
        );
      } else {
        console.log(
          getLocalizedText({
            english: "Failed to send message",
            hebrew: "שליחת ההודעה נכשלה",
          })
        );
      }
    } catch (err) {
      console.error(err);
      console.error(
        getLocalizedText({
          english: "Error sending message",
          hebrew: "שגיאה בשליחת ההודעה",
        })
      );
    }
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
          key={field.id}
          name={field.id}
          label={field.label}
          required={field.required}
          rules={field.rules}
          validateTrigger="onBlur"
        >
          {field.inputType === "text-area" ? (
            <Input.TextArea rows={4} />
          ) : (
            <Input autoComplete="false" />
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
