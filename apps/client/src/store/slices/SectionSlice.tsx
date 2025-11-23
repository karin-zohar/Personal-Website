import {
  AboutMe,
  Contact,
  Projects,
} from "@/components/Main/components/Main.components.index";
import { createRef, ReactNode, RefObject } from "react";
import { StateCreator } from "zustand";

const sectionKeys = ["about", "projects", "chatbot", "contact"] as const;

export type SectionKey = (typeof sectionKeys)[number];
type SectionRefs = Record<SectionKey, RefObject<HTMLDivElement | null>>;

export type SectionSlice = {
  sectionKeys: typeof sectionKeys;
  sectionRefs: SectionRefs;
  scrollTo: (key: SectionKey) => void;
  contentByKey: Record<SectionKey, ReactNode>;
};

export const sectionSlice: StateCreator<SectionSlice> = () => {
  const sectionRefs = sectionKeys.reduce<SectionRefs>((acc, key) => {
    acc[key] = createRef<HTMLDivElement>();
    return acc;
  }, {} as SectionRefs);

  const scrollTo = (key: SectionKey) => {
    const sectionRef = sectionRefs[key];
    sectionRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const contentByKey = {
    about: <AboutMe />,
    projects: <Projects />,
    chatbot: <span>chatbot</span>,
    contact: <Contact />,
  };

  return {
    sectionKeys,
    sectionRefs,
    scrollTo,
    contentByKey,
  };
};
