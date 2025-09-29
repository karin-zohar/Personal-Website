import React from "react";

import {
  ArrowOutwardIcon,
  CheckmarkIcon,
  EmailIcon,
  GithubIcon,
  LinkedinIcon,
} from "@/libs/ui/icons";
import { Button, Flex, List, Popover } from "antd";
import useStore from "@/store/store";
import useResettableCopyToClipboard from "@/libs/ui/hooks/useResettableCopyToClipboard";
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

const email = "karinzohar3@gmail.com";
const subject = "Cool website! Can I hire you?";
const body = "Let's chat!";

const SocialLinks = () => {
  const [copyState, copyToClipboard, resetCopyState] =
    useResettableCopyToClipboard();
  const { getLocalizedText } = useStore();

  const emailOptions = [
    {
      text: "gmail",
      link: `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(
        email
      )}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`,
    },
    {
      text: "outlook",
      link: `https://outlook.office.com/mail/deeplink/compose?to=${encodeURIComponent(
        email
      )}&subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(
        body
      )}`,
    },
    {
      text: getLocalizedText({
        english: "Copy email address",
        hebrew: "העתקת כתובת מייל",
      }),
      onClick: () => copyToClipboard(email),
    },
  ];

  const emailOptionsList = (
    <List
      className="email-options-list"
      dataSource={emailOptions}
      renderItem={({ link, text, onClick }) => (
        <List.Item>
          {link && (
            <a href={link} target="_blank">
              <span>{text} </span>
              <ArrowOutwardIcon />
            </a>
          )}
          {onClick && (
            <Button
              type="text"
              onClick={onClick}
              icon={
                copyState.error ? null : copyState.value && <CheckmarkIcon />
              }
              iconPosition="end"
            >
              {text}
            </Button>
          )}
        </List.Item>
      )}
    />
  );

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

      <Popover
        content={emailOptionsList}
        placement="bottom"
        arrow={false}
        destroyOnHidden
        onOpenChange={resetCopyState}
      >
        <Flex className="link-icon-wrapper">
          <EmailIcon />
        </Flex>
      </Popover>
    </Flex>
  );
};

export default SocialLinks;
