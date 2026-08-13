-- CreateTable
CREATE TABLE "AdminToken" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "token" TEXT NOT NULL,
    "expiresAt" DATETIME NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateIndex
CREATE UNIQUE INDEX "AdminToken_token_key" ON "AdminToken"("token");

-- CreateIndex
CREATE INDEX "AdminToken_token_idx" ON "AdminToken"("token");

-- CreateIndex
CREATE INDEX "AdminToken_expiresAt_idx" ON "AdminToken"("expiresAt");
