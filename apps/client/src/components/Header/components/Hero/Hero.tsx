import React from "react";
import useStore from "@/store/store";
import { Flex, Typography } from "antd";
import SocialLinks from "@/components/SocialLinks/SocialLinks";
import "./hero.style.css";

const Hero = () => {
  const { getLocalizedText } = useStore();
  const { Title, Text } = Typography;

  const heroImage =
    "https://plus.unsplash.com/premium_photo-1678566154673-a728037f3f00?q=80&w=702&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

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
          <img src={heroImage} alt="" />
        </div>
        <Flex className="hero-content-text" vertical>
          <Title level={1}>{getLocalizedText(heroText.title)}</Title>
          <Text className="bio">{getLocalizedText(heroText.bio)}</Text>
          <SocialLinks />
        </Flex>
      </Flex>
    </div>
  );
};

export default Hero;
