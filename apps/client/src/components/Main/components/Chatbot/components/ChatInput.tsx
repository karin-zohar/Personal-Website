import GenFormItem from "@/libs/ui/components/GenFormItem/GenFormItem";
import { ArrowUpIcon } from "@/libs/ui/icons";
import { Button, Form, Input } from "antd";
import React, { FC } from "react";

type ChatInputProps = {
  placeholder?: string;
};

const ChatInput: FC<ChatInputProps> = ({ placeholder }) => {
  return (
    <Form className="chat-input-form">
      <GenFormItem className="chat-input">
        <Input.TextArea placeholder={placeholder} rows={1} />
      </GenFormItem>
      <Button className="send-prompt-button" icon={<ArrowUpIcon />} />
    </Form>
  );
};

export default ChatInput;
