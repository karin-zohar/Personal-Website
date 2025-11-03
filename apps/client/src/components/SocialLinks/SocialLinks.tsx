import React from "react";

import { EmailIcon, GithubIcon, LinkedinIcon } from "@/libs/ui/icons";
import { Button, Flex } from "antd";
import useStore from "@/store/store";
import "./socialLinks.style.css";

const socialLinks = [
  {
    title: "Github",
    icon: <GithubIcon />,
    link: "https://github.com/karin-zohar",
  },
  {
    title: "Linkedin",
    icon: <LinkedinIcon />,
    link: "https://www.linkedin.com/in/karin-zohar-dev/",
  },
];

const SocialLinks = () => {
  const { scrollTo } = useStore();

  return (
    <Flex className="social-links">
      {socialLinks.map(({ title, icon, link }) => (
        <a
          href={link}
          target="_blank"
          title={title}
          aria-label={title}
          key={title}
        >
          <Flex className="link-icon-wrapper">{icon}</Flex>
        </a>
      ))}

      <Button
        key={"email"}
        className="link-icon-wrapper email-icon-wrapper"
        type="text"
        onClick={() => scrollTo("contact")}
        icon={<EmailIcon />}
      ></Button>
    </Flex>
  );
};

export default SocialLinks;
