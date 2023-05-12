/*
  Warnings:

  - You are about to drop the column `year` on the `curriculum` table. All the data in the column will be lost.
  - Added the required column `calYear` to the `curriculum` table without a default value. This is not possible if the table is not empty.
  - Added the required column `code` to the `curriculum` table without a default value. This is not possible if the table is not empty.
  - Added the required column `descr` to the `curriculum` table without a default value. This is not possible if the table is not empty.
  - Added the required column `stuYear` to the `subject` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "curriculum" DROP COLUMN "year",
ADD COLUMN     "calYear" INTEGER NOT NULL,
ADD COLUMN     "code" TEXT NOT NULL,
ADD COLUMN     "descr" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "subject" ADD COLUMN     "stuYear" INTEGER NOT NULL;
