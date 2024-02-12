import { Lucia } from "lucia";
import { Google } from "arctic";
import { LibSQLAdapter } from "@lucia-auth/adapter-sqlite";
import { env } from "@/env.js";
import { sqlite } from "@/server/db";
import { type User as DbUser } from "@/server/db/schema";

const adapter = new LibSQLAdapter(sqlite, {
  session: "sessions",
  user: "users",
});

export const lucia = new Lucia(adapter, {
  getSessionAttributes: (/* attributes */) => {
    return {};
  },
  getUserAttributes: (attributes) => {
    return {
      id: attributes.id,
      email: attributes.email,
      emailVerified: attributes.emailVerified,
      avatar: attributes.avatar,
      createdAt: attributes.createdAt,
      updatedAt: attributes.updatedAt,
      verificationLevel: attributes.verificationLevel,
    };
  },
  sessionCookie: {
    name: "session",
    expires: false, // session cookies have very long lifespan (2 years)
    attributes: {
      secure: env.NODE_ENV === "production",
    },
  },
});

export const google = new Google(
  env.GOOGLE_CLIENT_ID ?? "",
  env.GOOGLE_CLIENT_SECRET ?? "",
  env.NEXT_PUBLIC_APP_URL + "/login/google/callback",
);
declare module "lucia" {
  interface Register {
    Lucia: typeof lucia;
    DatabaseSessionAttributes: DatabaseSessionAttributes;
    DatabaseUserAttributes: DatabaseUserAttributes;
  }
}

interface DatabaseSessionAttributes {}
interface DatabaseUserAttributes extends Omit<DbUser, "hashedPassword"> {}
