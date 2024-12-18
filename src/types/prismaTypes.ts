import { Prisma } from "@prisma/client";

export type FullProject = Prisma.ProjectGetPayload<{
  include: {
    skills: true;
    links: true;
    cover: true;
    medias: true;
  };
}>;

export type FullSkill = Prisma.SkillGetPayload<{
  include: {
    image: true;
    projects: true;
  };
}>;

export type FullLink = Prisma.LinkGetPayload<{
  include: {
    icon: true;
    project: true;
  };
}>;

export type FullIcon = Prisma.IconGetPayload<{
  include: {
    Link: true;
  };
}>;

export type FullSectionPage = Prisma.SectionPageGetPayload<{
  include: {
    images: true;
    titles: true;
    contents: true;
  };
}>;

export type FullImageFile = Prisma.ImageFileGetPayload<{
  include: {
    skill: true;
    coverProject: true;
    mediasProject: true;
    SectionPage: true;
  };
}>;

export type ActionPrismaResponse = {
  success?: string;
  error?: string;
};
