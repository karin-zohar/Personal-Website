import React, { FC, Fragment, useEffect, useRef } from "react";
import { PromptAndReply } from "../Chatbot.types";
import { Flex } from "antd";
import { BeatLoader } from "react-spinners";
import GenMarkdownRenderer from "@/libs/ui/components/GenMarkdownRenderer";

type ActiveChatProps = {
  messages: PromptAndReply[];
};

const ActiveChat: FC<ActiveChatProps> = ({ messages }) => {
  const bottomRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "end",
    });
  }, [messages]);

  return (
    <Flex vertical className="active-chat">
      {messages.map(({ prompt, reply }, idx) => {
        const isLast = idx === messages.length - 1;
        return (
          <Fragment key={idx}>
            <div className="chat-message prompt">
              <span>{prompt}</span>
            </div>
            {reply ? (
              <div
                className="chat-message chat-reply"
                ref={isLast ? bottomRef : null}
              >
                <GenMarkdownRenderer markdown={reply} />
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
