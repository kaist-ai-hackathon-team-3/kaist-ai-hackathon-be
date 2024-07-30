-- CreateTable
CREATE TABLE "user" (
    "id" SERIAL NOT NULL,
    "email" TEXT,
    "username" TEXT,
    "kakaoId" BIGINT,
    "kakaoAccessToken" TEXT,
    "kakaoRefreshToken" TEXT,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RefreshToken" (
    "id" SERIAL NOT NULL,
    "token" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "RefreshToken_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Profile" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER,

    CONSTRAINT "Profile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Policy" (
    "serviceID" TEXT NOT NULL,
    "supportType" TEXT NOT NULL,
    "serviceName" TEXT NOT NULL,
    "servicePurpose" TEXT NOT NULL,
    "applicationDeadline" TEXT NOT NULL,
    "supportTarget" TEXT NOT NULL,
    "selectionCriteria" TEXT NOT NULL,
    "supportDetails" TEXT NOT NULL,
    "applicationMethod" TEXT NOT NULL,
    "requiredDocuments" TEXT NOT NULL,
    "receptionAgencyName" TEXT NOT NULL,
    "contactInfo" TEXT NOT NULL,
    "onlineApplicationURL" TEXT NOT NULL,
    "lastModified" TEXT NOT NULL,
    "responsibleAgencyName" TEXT NOT NULL,
    "administrativeRules" TEXT NOT NULL,
    "autonomousRegulations" TEXT NOT NULL,
    "laws" TEXT NOT NULL,

    CONSTRAINT "Policy_pkey" PRIMARY KEY ("serviceID")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");

-- CreateIndex
CREATE UNIQUE INDEX "user_kakaoId_key" ON "user"("kakaoId");

-- CreateIndex
CREATE UNIQUE INDEX "RefreshToken_token_key" ON "RefreshToken"("token");

-- AddForeignKey
ALTER TABLE "RefreshToken" ADD CONSTRAINT "RefreshToken_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Profile" ADD CONSTRAINT "Profile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE CASCADE;
