import React, { useState } from "react";
import { Dictionary } from "@/store/slices/i18n.slice";
import useStore from "@/store/store";
import { Typography } from "antd";
import "./chatbot-section.style.css";
import ChatInput from "./components/ChatInput";

const ChatbotSection = () => {
  const [isChatting, setIsChatting] = useState<boolean>(false);

  const { getLocalizedText } = useStore();
  const { Title } = Typography;
  const title: Dictionary = {
    english: "Want to find out more?",
    hebrew: "רוצה לגלות עוד?",
  };
  const subtitle: Dictionary = {
    english: "My AI assistant is here to answer your questions! ✨",
    hebrew: "עוזר הAI שלי כאן כדי לענות על כל שאלה!  ✨",
  };

  const inputPlaceholder: Dictionary = {
    english: "Why should I hire Karin?",
    hebrew: "למה כדאי לי להעסיק את קארין?",
  };
  return (
    <div className="chatbot-section">
      {isChatting ? (
        <span>chatting...</span>
      ) : (
        <>
          <div className="header">
            <Title level={3}>{getLocalizedText(title)}</Title>
            <span>{getLocalizedText(subtitle)}</span>
          </div>
          <ChatInput
            placeholder={getLocalizedText(inputPlaceholder) as string}
          />
        </>
      )}
    </div>
  );
};

export default ChatbotSection;
