import React, { useState } from "react";
import useStore from "@/store/store";
import { Flex, Typography } from "antd";
import clsx from "clsx";
import "./soft-skills.style.css";

const SoftSkills = () => {
  const { Text } = Typography;
  const { getLocalizedText } = useStore();

  const introText = {
    english:
      "Hello! I'm Karin, a Front End Developer with a Full Stack background. \n I love learning about new technologies, solving interesting problems and bringing ideas to life. \n In addition to my ever-growing stack of technological skills, I also bring:",
    hebrew:
      "היי! אני קארין, מפתחת פרונט-אנד עם רקע בפול-סטאק. \n אני אוהבת ללמוד על טכנולוגיות חדשות, לפתור בעיות מעניינות ולהביא רעיונות לחיים.  \n בנוסף ליכולות הטכנולוגיות שלי שתמיד מתפתחות, אני מביאה איתי: ",
  };

  const [softSkills, setSoftSkills] = useState([
    {
      key: "creativity",
      title: { english: "Creativity", hebrew: "יצירתיות" },
      subtitle: {
        english: "Sometimes the right solution requires a new perspective",
        hebrew: "לפעמים הפיתרון הנכון מצריך נקודת מבט חדשה",
      },
      isFlipped: false,
    },
    {
      key: "curiosity",
      title: { english: "Curiosity", hebrew: "סקרנות" },
      subtitle: {
        english: "Always learning, always growing",
        hebrew: "תמיד לומדת, תמיד מתפתחת",
      },
      isFlipped: false,
    },
    {
      key: "proactivity",
      title: { english: "Proactivity", hebrew: "יוזמה" },
      subtitle: {
        english: "Turning ideas into reality",
        hebrew: "להפוך רעיונות למציאות",
      },
      isFlipped: false,
    },
  ]);

  const flipCard = (key: string) => {
    setSoftSkills((prev) =>
      prev.map((card) =>
        card.key === key ? { ...card, isFlipped: !card.isFlipped } : card
      )
    );
  };

  return (
    <div className="soft-skills">
      <Text className="intro">{getLocalizedText(introText)}</Text>
      <Flex className="cards-container">
        {softSkills.map((item) => {
          return (
            <Flex
              key={item.key}
              className={clsx("card", { flipped: item.isFlipped })}
              onClick={() => flipCard(item.key)}
            >
              <span className="card-front">{getLocalizedText(item.title)}</span>
              <span className="card-back">
                {getLocalizedText(item.subtitle)}
              </span>
            </Flex>
          );
        })}
      </Flex>
    </div>
  );
};

export default SoftSkills;
