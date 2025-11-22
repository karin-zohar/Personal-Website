import { Dictionary } from "@/store/slices/i18n.slice";

export type ProjectCardProps = {
  key: string;
  title: Dictionary;
  projectUrl: string;
  imgUrl: string;
  tags: string[];
};
