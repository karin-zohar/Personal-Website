import GenFormItem from "@/libs/ui/components/GenFormItem/GenFormItem";
import { ArrowUpIcon } from "@/libs/ui/icons";
import { Button, Form, Input } from "antd";
import { useForm } from "antd/es/form/Form";
import React, { FC } from "react";

type ChatInputProps = {
  placeholder?: string;
};

const ChatInput: FC<ChatInputProps> = ({ placeholder }) => {
  const [form] = useForm();
  const message = Form.useWatch("message", form);
  return (
    <Form form={form} className="chat-input-form">
      <GenFormItem className="chat-input" name={"message"}>
        <Input.TextArea placeholder={placeholder} rows={1} />
      </GenFormItem>
      <Button
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
