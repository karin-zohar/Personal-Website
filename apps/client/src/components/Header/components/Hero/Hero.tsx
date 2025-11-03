import React from "react";
import useStore from "@/store/store";
import { Flex, Typography } from "antd";
import SocialLinks from "@/components/SocialLinks/SocialLinks";
import { default as HeroImage } from "@/assets/img/hero-karin.jpg";
import "./hero.style.css";

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
        "I'm a curious, creative and detail oriented Fullstack Developer with a passion for creating amazing user experiences with clean and maintainable code.",
      hebrew:
        "אני מפתחת פולסטאק סקרנית ויצירתית עם תשומת לב לפרטים ותשוקה ליצירת חוויות משתמש מדהימות עם קוד נקי וקל לתחזוקה.",
    },
  };

  return (
    <div className={"hero"}>
      <Flex className="hero-content">
        <div className="hero-img-container">
          <img
            src={HeroImage}
            alt="A young woman with dark hair standing in a park and smiling."
          />
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
