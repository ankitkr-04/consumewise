/* eslint-disable no-undef */
"use server";

import { createAdminClient } from "@/lib/appwrite";
import { parseStringify } from "@/lib/utils";
import console from "console";
import { cookies } from "next/headers";
import { ID, Query } from "node-appwrite";

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
  } catch (error: unknown) {
    // console.log(error);
  }
};

export const signUp = async ({ password, ...data }: signUpProps) => {
  let newAccount;
  try {
    console.log(data, password);

    const { email, name, activityLevel, gender, height, weight, age } = data;
    const { account, db } = await createAdminClient();

    // Account creation
    newAccount = await account.create(ID.unique(), email, password, name);
    if (!newAccount) throw new Error("Failed to create account");
    // console.log("Account created:", newAccount);

    // Database document creation
    const newUser = await db.createDocument(
      DB_ID!,
      USER_COLLECTION_ID!,
      ID.unique(),
      {
        userId: newAccount.$id,
        email,
        name,
        age,
        activityLevel,
        height,
        gender,
        weight,
      }
    );
    if (!newUser) throw new Error("Failed to create user document");
    // console.log("User document created:", newUser);

    // Session creation
    const session = await account.createEmailPasswordSession(email, password);
    console.log("Session created:", session);

    cookies().set("appwrite-session", session.secret, {
      path: "/",
      httpOnly: true,
      sameSite: "strict",
      secure: true,
    });

    return parseStringify(newUser);
  } catch (error) {
    console.error("Sign-up failed:", error);
    throw error; // Re-throw the error for higher-level handling
  }
};
