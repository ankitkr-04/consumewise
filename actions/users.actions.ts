/* eslint-disable no-undef */
"use server";

import { createAdminClient } from "@/lib/appwrite";
import { parseStringify } from "@/lib/utils";
import { cookies } from "next/headers";
import { Query } from "node-appwrite";

const {
  APPWRITE_DATABASE_ID: DB_ID,
  APPWRITE_USER_COLLECTION_ID: USER_COLLECTION_ID,
} = process.env;

export const getUserInfo = async ({ userId }: userInfoProps) => {
  try {
    const { db } = await createAdminClient();

    const user = await db.listDocuments(DB_ID!, USER_COLLECTION_ID!, [
      Query.equal("userId", [userId]),
    ]);

    return parseStringify(user.documents[0]);
  } catch (error) {
    console.error("Failed to get User Info");
  }
};

export const signIn = async (data: signInProps) => {
  try {
    const { email, password } = data;
    const { account } = await createAdminClient();
    const session = await account.createEmailPasswordSession(email, password);

    cookies().set("appwrite-session", session.secret, {
      path: "/",
      httpOnly: true,
      sameSite: "strict",
      secure: true,
    });

    const user = await getUserInfo({ userId: session.userId });
    return user;
  } catch (error) {
    console.error("Error signing in user", error);
  }
};
