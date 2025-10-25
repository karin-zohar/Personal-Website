import React from "react";
import ContactForm from "./components/ContactForm";
import "./contact.style.css";
import { Typography } from "antd";
import useStore from "@/store/store";

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
