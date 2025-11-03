import React, { useState } from "react";
import ContactForm from "./components/ContactForm";
import { Typography } from "antd";
import useStore from "@/store/store";
import "./contact.style.css";

const Contact = () => {
  const { Title } = Typography;
  const { getLocalizedText } = useStore();

  const [isMessageSent, setIsMessageSent] = useState<boolean>(false);

  const titleText = getLocalizedText({
    english: "Let's talk!",
    hebrew: "בואו נדבר!",
  });

  const messageSentText = {
    title: getLocalizedText({
      english: "I got your message! 🎉",
      hebrew: "קיבלתי את ההודעה! 🎉",
    }),
    subtitle: getLocalizedText({
      english: "Thank you for reaching out! I will get back to you soon. ",
      hebrew: "תודה על הפניה! אחזור אליך בקרוב.",
    }),
  };

  return (
    <div className="contact">
      {isMessageSent ? (
        <div className="message-sent">
          <span>{messageSentText.title}</span>
          <p>{messageSentText.subtitle}</p>
        </div>
      ) : (
        <>
          <Title level={3}>{titleText}</Title>
          <ContactForm setIsMessageSent={setIsMessageSent} />
        </>
      )}
    </div>
  );
};

export default Contact;
