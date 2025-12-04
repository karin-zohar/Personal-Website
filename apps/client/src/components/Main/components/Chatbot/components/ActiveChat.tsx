import React, { FC } from "react";
import { PromptAndReply } from "../Chatbot.types";

type ActiveChatProps = {
  messages: PromptAndReply[];
};

const ActiveChat: FC<ActiveChatProps> = ({ messages }) => {
  return (
    <div>
      {messages.map(({ prompt, reply }) => {
        return (
          <>
            <span>{prompt}</span>
            {reply ? <span>{reply}</span> : <span>...</span>}
          </>
        );
      })}
    </div>
  );
};

export default ActiveChat;
