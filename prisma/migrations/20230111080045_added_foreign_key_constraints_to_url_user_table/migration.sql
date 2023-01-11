-- DropForeignKey
ALTER TABLE "url_user" DROP CONSTRAINT "url_user_url_id_fkey";

-- DropForeignKey
ALTER TABLE "url_user" DROP CONSTRAINT "url_user_user_id_fkey";

-- AddForeignKey
ALTER TABLE "url_user" ADD CONSTRAINT "url_user_url_id_fkey" FOREIGN KEY ("url_id") REFERENCES "urls"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "url_user" ADD CONSTRAINT "url_user_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
