/*
  Warnings:

  - Added the required column `gender` to the `Profile` table without a default value. This is not possible if the table is not empty.
  - Added the required column `householdIncome` to the `Profile` table without a default value. This is not possible if the table is not empty.
  - Added the required column `householdSize` to the `Profile` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `Profile` table without a default value. This is not possible if the table is not empty.
  - Added the required column `occupation` to the `Profile` table without a default value. This is not possible if the table is not empty.
  - Added the required column `region` to the `Profile` table without a default value. This is not possible if the table is not empty.
  - Added the required column `targetFeature` to the `Profile` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Profile" ADD COLUMN     "gender" TEXT NOT NULL,
ADD COLUMN     "householdIncome" INTEGER NOT NULL,
ADD COLUMN     "householdSize" INTEGER NOT NULL,
ADD COLUMN     "name" TEXT NOT NULL,
ADD COLUMN     "occupation" TEXT NOT NULL,
ADD COLUMN     "region" TEXT NOT NULL,
ADD COLUMN     "targetFeature" TEXT NOT NULL;
