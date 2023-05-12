/*
  Warnings:

  - Added the required column `type` to the `schedule` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "schedule" ADD COLUMN     "type" TEXT NOT NULL;
