DELETE FROM
  urls a
  USING urls b
WHERE
  a.id < b.id
  AND a.short_url = b.short_url;

-- CreateIndex
CREATE UNIQUE INDEX "urls_short_url_key" ON "urls"("short_url");
