/*
  Warnings:

  - A unique constraint covering the columns `[linkId]` on the table `ImageFile` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[imageId]` on the table `Link` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "ImageFile" ADD COLUMN     "linkId" TEXT;

-- AlterTable
ALTER TABLE "Link" ADD COLUMN     "imageId" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "ImageFile_linkId_key" ON "ImageFile"("linkId");

-- CreateIndex
CREATE UNIQUE INDEX "Link_imageId_key" ON "Link"("imageId");

-- AddForeignKey
ALTER TABLE "ImageFile" ADD CONSTRAINT "ImageFile_linkId_fkey" FOREIGN KEY ("linkId") REFERENCES "Link"("id") ON DELETE CASCADE ON UPDATE CASCADE;
