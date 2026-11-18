-- AlterTable
ALTER TABLE "user" ADD COLUMN     "role" TEXT DEFAULT 'customer',
ADD COLUMN     "status" TEXT DEFAULT 'active';
