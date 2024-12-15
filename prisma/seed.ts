import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const items = [
  {
    title: "Accueil",
    url: "/",
    inNav: "on",
  },
  {
    title: "Projets",
    url: "/pages/projets",
    inNav: "on",
  },
  {
    title: "Compétences",
    url: "/pages/skills",
    inNav: "on",
  },
  {
    title: "Contact",
    url: "/pages/contact",
    inNav: "on",
  },
  {
    title: "Login",
    url: "/login",
    inNav: "on",
  },

  {
    title: "Sections",
    url: "/dashboard/sections",
    inNav: "off",
    isAdmin: "on",
  },
  {
    title: "Projets",
    url: "/dashboard/projets",
    inNav: "off",
    isAdmin: "on",
  },
  {
    title: "Compétences",
    url: "/dashboard/skills",
    inNav: "off",
    isAdmin: "on",
  },
  {
    title: "Liens",
    url: "/dashboard/links",
    inNav: "off",
    isAdmin: "on",
  },
  {
    title: "Icones",
    url: "/dashboard/icons",
    inNav: "off",
    isAdmin: "on",
  },
];

async function main() {
  console.log("Seeding database...");

  for (const item of items) {
    await prisma.link.upsert({
      where: { url: item.url },
      update: { ...item },
      create: {
        ...item,
      },
    });
  }

  console.log("Seeding complete!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
