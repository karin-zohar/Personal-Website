import React from "react";
import "./hero.style.css";
import { Flex, Typography } from "antd";
import useStore from "@/store/store";

const Hero = () => {
  const { getLocalizedText } = useStore();
  const { Title, Text } = Typography;

  const heroText = {
    title: {
      english: "Karin Zohar",
      hebrew: "קארין זוהר",
    },
    bio: {
      english:
        "I'm a curious, creative and detail oriented Front-End Developer with a passion for creating amazing user experiences with clean and maintainable code.",
      hebrew:
        "אני מפתחת פרונטאנד סקרנית ויצירתית עם תשומת לב לפרטים ותשוקה ליצירת חוויות משתמש מדהימות עם קוד נקי וקל לתחזוקה.",
    },
  };
  return (
    <div className={"hero"}>
      <Flex className="hero-content">
        <div className="hero-img-container">
          <img
            src="https://images.unsplash.com/photo-1758344953670-c15779f89ed4?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt=""
          />
        </div>
        <Flex className="hero-content-text" vertical>
          <Title level={1}>{getLocalizedText(heroText.title)}</Title>
          <Text className="bio">{getLocalizedText(heroText.bio)}</Text>
          <div className="links">XXX</div>
        </Flex>
      </Flex>
    </div>
  );
};

export default Hero;
