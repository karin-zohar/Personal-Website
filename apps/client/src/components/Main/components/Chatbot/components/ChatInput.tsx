import React, { FC } from "react";
import GenFormItem from "@/libs/ui/components/GenFormItem/GenFormItem";
import { ArrowUpIcon } from "@/libs/ui/icons";
import { Button, Form, Input } from "antd";
import { useForm } from "antd/es/form/Form";

type ChatInputProps = {
  setPrompt: (prompt: string) => void;
  updateReply: (prompt: string) => void;
  placeholder?: string;
};

const ChatInput: FC<ChatInputProps> = ({
  setPrompt,
  updateReply,
  placeholder,
}) => {
  const [form] = useForm();
  const message = Form.useWatch("message", form);

  const handleFinish = () => {
    console.log("message: ", message);
    setPrompt(message);
    form.resetFields();
    updateReply(message);
  };

  return (
    <Form form={form} className="chat-input-form" onFinish={handleFinish}>
      <GenFormItem className="chat-input" name={"message"}>
        <Input placeholder={placeholder} />
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
