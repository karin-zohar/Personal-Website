import GenFormItem from "@/libs/ui/components/GenFormItem/GenFormItem";
import { ArrowUpIcon } from "@/libs/ui/icons";
import { Button, Flex, Form, Input } from "antd";
import React, { FC } from "react";

type ChatInputProps = {
  placeholder?: string;
};

const ChatInput: FC<ChatInputProps> = ({ placeholder }) => {
  return (
    <Form>
      <Flex>
        <GenFormItem>
          <Input.TextArea placeholder={placeholder} rows={1} />
        </GenFormItem>
        <Button icon={<ArrowUpIcon />} />
      </Flex>
    </Form>
  );
};

export default ChatInput;
