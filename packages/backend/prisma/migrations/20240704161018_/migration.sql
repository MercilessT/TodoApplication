-- AlterTable
ALTER TABLE "Todo" ADD COLUMN     "isCompleted" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "isPrivate" BOOLEAN NOT NULL DEFAULT true;
