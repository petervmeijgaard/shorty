-- CreateTable
CREATE TABLE "url_user" (
    "url_id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,

    CONSTRAINT "url_user_pkey" PRIMARY KEY ("url_id","user_id")
);

-- AddForeignKey
ALTER TABLE "url_user" ADD CONSTRAINT "url_user_url_id_fkey" FOREIGN KEY ("url_id") REFERENCES "urls"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "url_user" ADD CONSTRAINT "url_user_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
