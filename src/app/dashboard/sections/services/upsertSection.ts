import {
  createSectionPageAction,
  updateSectionPageAction,
} from "./section.action";

type sectionData = {
  id?: string;
  titles: string[];
  contents: string[];
  medias: File[] | undefined;
  order: string | undefined;
  type: string;
  actionType: string;
};

export const upsertSection = async (section: sectionData) => {
  const res = await (section.actionType === "modifier"
    ? updateSectionPageAction(section)
    : createSectionPageAction(section));
  return res;
};
