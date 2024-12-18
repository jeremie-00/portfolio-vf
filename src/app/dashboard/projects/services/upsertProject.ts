"use server";
import { createProjectAction, updateProjectAction } from "./project.action";

/* type Link = {
  ID: (string | undefined)[]; // Tableau contenant des chaînes ou undefined
  url: string[];
  title: string[];
  inNav: (string | undefined)[];
  iconId: (string | undefined)[];
  iconName: (string | undefined)[];
}; */

// Type principal pour le projet
type ProjectData = {
  status?: string;
  actionType?: string;
  ID?: string;
  title: string;
  shortDesc: string;
  longDesc: string;
  order?: string;
  type?: string;
  cover?: File;
  medias?: File[];
  skills?: string[];
  links?: {
    id?: string;
    url: string;
    title: string;
    inNav?: string;
    iconId?: string;
    isAdmin?: string;
    type?: string;
    target?: string;
    projectId?: string;
    order?: number;
  }[];
};

export const upsertProject = async (project: ProjectData) => {
  const res = await (project.status === "edit"
    ? updateProjectAction(project)
    : createProjectAction(project));
  return res;
};
