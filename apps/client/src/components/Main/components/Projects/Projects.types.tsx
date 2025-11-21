import { Dictionary } from "@/store/slices/i18n.slice";

export type ProjectCardProps = {
  key: string;
  imgUrl: string;
  title: Dictionary;
  tags: string[];
};
