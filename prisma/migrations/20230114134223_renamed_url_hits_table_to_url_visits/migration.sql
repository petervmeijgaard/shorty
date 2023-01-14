/*
  Warnings:

  - You are about to drop the `url_hits` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "url_hits" DROP CONSTRAINT "url_hits_url_id_fkey";

-- DropTable
DROP TABLE "url_hits";

-- CreateTable
CREATE TABLE "url_visits" (
    "id" TEXT NOT NULL,
    "url_id" TEXT NOT NULL,

    CONSTRAINT "url_visits_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "url_visits" ADD CONSTRAINT "url_visits_url_id_fkey" FOREIGN KEY ("url_id") REFERENCES "urls"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
