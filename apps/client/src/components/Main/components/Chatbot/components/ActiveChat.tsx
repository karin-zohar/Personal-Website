import React, { FC, Fragment } from "react";
import { PromptAndReply } from "../Chatbot.types";
import { Flex } from "antd";
import { BeatLoader } from "react-spinners";

type ActiveChatProps = {
  messages: PromptAndReply[];
};

const ActiveChat: FC<ActiveChatProps> = ({ messages }) => {
  return (
    <Flex vertical className="active-chat">
      {messages.map(({ prompt, reply }, idx) => {
        return (
          <Fragment key={idx}>
            <div className="chat-message prompt">
              <span>{prompt}</span>
            </div>
            {reply ? (
              <div className="chat-message chat-reply">
                <span>{reply}</span>
              </div>
            ) : (
              <BeatLoader color={"var(--teal-500)"} />
            )}
          </Fragment>
        );
      })}
    </Flex>
  );
};

export default ActiveChat;
