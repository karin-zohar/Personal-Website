import React from "react";
import useStore from "@/store/store";
import { Flex, Typography } from "antd";
import "./soft-skills.style.css";

const SoftSkills = () => {
  const { Text } = Typography;
  const { getLocalizedText } = useStore();

  const introText = {
    english:
      "Hello, I'm Karin! I'm a Front End Developer with a Full Stack background. I love learning new things, solving interesting problems and making ideas come to life. Beside my ever-growing technological skills, I also bring to the table:",
    hebrew:
      "היי, אני קארין! אני מפתחת פרונט-אנד עם רקע בפול-סטאק. אני אוהבת ללמוד דברים חדשים, לפתור בעיות מעניינות ולהביא רעיונות לחיים. בנוסף ליכולות הטכנולוגיות שלי שתמיד מתפתחות, אני מביאה לשולחן: ",
  };

  const softSkills = [
    {
      key: "creativity",
      title: { english: "Creativity", hebrew: "יצירתיות" },
      subtitle: { english: "", hebrew: "יצירתיות" },
    },
    {
      key: "curiosity",
      title: { english: "Curiosity", hebrew: "סקרנות" },
      subtitle: {
        english:
          "There is always something new to learn and discover. Always learning, always growing. ",
        hebrew: "תמיד יש משהו חדש ללמוד ולגלות. תמיד לומדת, תמיד מתפתחת.",
      },
    },
    {
      key: "proactivity",
      title: { english: "Proactivity", hebrew: "יוזמה" },
      subtitle: { english: "", hebrew: "יצירתיות" },
    },
  ];

  const localizedIntroText = getLocalizedText(introText);

  return (
    <div className="soft-skills">
      <Text>{localizedIntroText}</Text>
      <Flex className="cards-container">
        {softSkills.map((item) => {
          return (
            <Flex className="card">
              <span className="card-front">{getLocalizedText(item.title)}</span>
            </Flex>
          );
        })}
      </Flex>
    </div>
  );
};

export default SoftSkills;
