"use server";
import { createProjectAction, updateProjectAction } from "./project.action";

import { revalidatePath } from "next/cache";

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
  revalidatePath("/");
  return res;
};

/*(alias) type Link = {
    id: string;
    url: string;
    title: string;
    order: number;
    target: string | null;
    type: string | null;
    inNav: boolean | null;
    isAdmin: boolean | null;
    projectId: string | null;
    iconId: string | null;
}
   const createdLink: {
    id: string;
    url: string;
    title: string;
    order: number;
    target: string | null;
    type: string | null;
    inNav: boolean | null;
    isAdmin: boolean | null;
    projectId: string | null;
    iconId: string | null;
} 
    
const links: {
    title: string;
    url: string;
    inNav: boolean;
    isAdmin: boolean;
    order: number;
    type: string;
    id: string;
    iconId: string;
    projectId: string;
    target: string;
}
    
    */
