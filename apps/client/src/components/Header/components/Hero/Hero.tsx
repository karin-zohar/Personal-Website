import React from "react";
import useStore from "@/store/store";
import { Flex, Typography } from "antd";
import SocialLinks from "@/components/SocialLinks/SocialLinks";
import "./hero.style.css";
import { default as HeroImage } from "@/assets/img/hero-karin.jpg";

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
          <img src={HeroImage} alt="" />
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
