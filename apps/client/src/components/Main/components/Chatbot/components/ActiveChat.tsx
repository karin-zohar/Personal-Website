import React, { FC } from "react";
import { PromptAndReply } from "../Chatbot.types";
import { Flex } from "antd";

type ActiveChatProps = {
  messages: PromptAndReply[];
};

const ActiveChat: FC<ActiveChatProps> = ({ messages }) => {
  return (
    <Flex vertical className="active-chat">
      {messages.map(({ prompt, reply }) => {
        return (
          <>
            <div className="chat-message prompt">
              <span>{prompt}</span>
            </div>
            {reply ? (
              <div className="chat-message chat-reply">
                <span>{reply}</span>
              </div>
            ) : (
              <span>...</span> //loader
            )}
          </>
        );
      })}
    </Flex>
  );
};

export default ActiveChat;
