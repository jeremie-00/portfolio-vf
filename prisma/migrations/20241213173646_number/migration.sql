/*
  Warnings:

  - Made the column `order` on table `SectionPage` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Link" ALTER COLUMN "order" SET DEFAULT '1',
ALTER COLUMN "order" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "Project" ALTER COLUMN "order" SET DEFAULT '1',
ALTER COLUMN "order" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "SectionPage" ALTER COLUMN "order" SET NOT NULL,
ALTER COLUMN "order" SET DEFAULT '1',
ALTER COLUMN "order" SET DATA TYPE TEXT;
