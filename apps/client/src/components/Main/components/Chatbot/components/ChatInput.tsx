import GenFormItem from "@/libs/ui/components/GenFormItem/GenFormItem";
import { ArrowUpIcon } from "@/libs/ui/icons";
import { Button, Form, Input } from "antd";
import { useForm } from "antd/es/form/Form";
import React, { FC } from "react";

type ChatInputProps = {
  setPrompt: (prompt: string) => void;
  placeholder?: string;
};

const ChatInput: FC<ChatInputProps> = ({ setPrompt, placeholder }) => {
  const [form] = useForm();
  const message = Form.useWatch("message", form);

  const handleFinish = () => {
    console.log("message: ", message);
    setPrompt(message);
    form.resetFields();
  };
  return (
    <Form form={form} className="chat-input-form" onFinish={handleFinish}>
      <GenFormItem className="chat-input" name={"message"}>
        <Input.TextArea placeholder={placeholder} rows={1} />
      </GenFormItem>
      <Button
        htmlType="submit"
        disabled={!message}
        className="send-prompt-button"
        type="text"
        icon={<ArrowUpIcon />}
        shape="circle"
      />
    </Form>
  );
};

export default ChatInput;
