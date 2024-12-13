import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const items = [
  {
    title: "Accueil",
    url: "/",
    inNav: true,
  },
  {
    title: "Projets",
    url: "/pages/projets",
    inNav: true,
  },
  {
    title: "Competence",
    url: "/pages/skills",
    inNav: true,
  },
  {
    title: "Contact",
    url: "/pages/contact",
    inNav: true,
  },
  {
    title: "Login",
    url: "/login",
    inNav: true,
  },

  {
    title: "Sections",
    url: "/dashboard/sections",
    inNav: false,
    isAdmin: true,
  },
  {
    title: "Projets",
    url: "/dashboard/projets",
    inNav: false,
    isAdmin: true,
  },
  {
    title: "Competence",
    url: "/dashboard/skills",
    inNav: false,
    isAdmin: true,
  },
  {
    title: "Icones",
    url: "/dashboard/icons",
    inNav: false,
    isAdmin: true,
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
