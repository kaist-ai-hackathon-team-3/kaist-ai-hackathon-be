/*
  Warnings:

  - You are about to drop the column `chatRoomId` on the `Conversation` table. All the data in the column will be lost.
  - Added the required column `roomId` to the `ChatRoom` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Conversation" DROP CONSTRAINT "Conversation_chatRoomId_fkey";

-- AlterTable
ALTER TABLE "ChatRoom" ADD COLUMN     "roomId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Conversation" DROP COLUMN "chatRoomId";

-- CreateTable
CREATE TABLE "RoomConversation" (
    "chatRoomId" INTEGER NOT NULL,
    "conversationId" INTEGER NOT NULL,

    CONSTRAINT "RoomConversation_pkey" PRIMARY KEY ("chatRoomId","conversationId")
);

-- AddForeignKey
ALTER TABLE "RoomConversation" ADD CONSTRAINT "RoomConversation_chatRoomId_fkey" FOREIGN KEY ("chatRoomId") REFERENCES "ChatRoom"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RoomConversation" ADD CONSTRAINT "RoomConversation_conversationId_fkey" FOREIGN KEY ("conversationId") REFERENCES "Conversation"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
