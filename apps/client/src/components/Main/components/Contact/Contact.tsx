import React from "react";
import ContactForm from "./components/ContactForm";
import { Typography } from "antd";
import useStore from "@/store/store";
import "./contact.style.css";

const Contact = () => {
  const { Title } = Typography;
  const { getLocalizedText } = useStore();

  const titleText = getLocalizedText({
    english: "Let's talk!",
    hebrew: "בואו נדבר!",
  });

  return (
    <div className="contact">
      <Title level={3}>{titleText}</Title>
      <ContactForm />
    </div>
  );
};

export default Contact;
