import React, { useState } from "react";
import { Dictionary } from "@/store/slices/i18n.slice";
import useStore from "@/store/store";
import { Typography } from "antd";
import "./chatbot-section.style.css";
import ChatInput from "./components/ChatInput";
import ActiveChat from "./components/ActiveChat";
import { PromptAndReply } from "./Chatbot.types";
import { apiRequest } from "@/api/apiService";

interface ChatResponse {
  success: boolean;
  reply: string;
}

const ChatbotSection = () => {
  const [messages, setMessages] = useState<PromptAndReply[]>([]);

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

  const updatePrompt = (newPrompt: string) => {
    setMessages((prev) => [...prev, { prompt: newPrompt }]);
  };

  const getReply = async (prompt: string): Promise<string> => {
    const response = await apiRequest<ChatResponse>("POST", "/api/chat", {
      prompt,
    });

    //temp
    // const response = Promise.resolve({ reply: `reply for ${prompt}` });

    const data = await response;
    return data.reply;
  };

  const updateReply = async (prompt: string) => {
    const reply = await getReply(prompt);

    setMessages((prev) => {
      if (prev.length === 0) {
        return prev;
      }

      const updated = [...prev];
      updated[updated.length - 1] = {
        ...updated[updated.length - 1],
        reply,
      };

      return updated;
    });
  };

  return (
    <div className="chatbot-section">
      <div className="header">
        <Title level={3}>{getLocalizedText(title)}</Title>
        <span>{getLocalizedText(subtitle)}</span>
      </div>
      {messages.length > 0 && <ActiveChat messages={messages} />}

      <ChatInput
        setPrompt={(prompt: string) => updatePrompt(prompt)}
        updateReply={(prompt: string) => updateReply(prompt)}
        placeholder={getLocalizedText(inputPlaceholder) as string}
      />
    </div>
  );
};

export default ChatbotSection;
