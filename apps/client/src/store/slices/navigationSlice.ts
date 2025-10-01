import { createRef, RefObject } from "react";
import { StateCreator } from "zustand";

const sectionKeys = ["about", "projects", "chatbot", "contact"] as const;

export type SectionKey = (typeof sectionKeys)[number];
type SectionRefs = Record<SectionKey, RefObject<HTMLDivElement | null>>;

export type NavigationSlice = {
  sectionKeys: typeof sectionKeys;
  sectionRefs: SectionRefs;
  scrollTo: (key: SectionKey) => void;
};

export const navigationSlice: StateCreator<NavigationSlice> = () => {
  const sectionRefs = sectionKeys.reduce<SectionRefs>((acc, key) => {
    acc[key] = createRef<HTMLDivElement>();
    return acc;
  }, {} as SectionRefs);

  return {
    sectionKeys,
    sectionRefs,
    scrollTo: (key: SectionKey) => {
      const sectionRef = sectionRefs[key];
      sectionRef.current?.scrollIntoView({ behavior: "smooth" });
    },
  };
};
