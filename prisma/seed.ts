import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const items = [
  {
    title: "Accueil",
    url: "/",
  },
  {
    title: "Projets",
    url: "/pages/projets",
  },
  {
    title: "Competence",
    url: "/pages/skills",
  },
  {
    title: "Contact",
    url: "/pages/contact",
  },
  {
    title: "Login",
    url: "/login",
  },
];

async function main() {
  console.log("Seeding database...");

  for (const item of items) {
    await prisma.link.upsert({
      where: { url: item.url },
      update: {},
      create: {
        title: item.title,
        url: item.url,
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
