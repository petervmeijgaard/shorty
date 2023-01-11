-- CreateTable
CREATE TABLE "url_hits" (
    "id" TEXT NOT NULL,
    "url_id" TEXT NOT NULL,

    CONSTRAINT "url_hits_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "url_hits" ADD CONSTRAINT "url_hits_url_id_fkey" FOREIGN KEY ("url_id") REFERENCES "urls"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
