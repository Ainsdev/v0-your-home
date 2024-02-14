import { sql } from "drizzle-orm";
import {
  text,
  index,
  real,
  integer,
  sqliteTable,
} from "drizzle-orm/sqlite-core";
import { relations } from "drizzle-orm";

export const users = sqliteTable(
  "users",
  {
    id: text("id").primaryKey(),
    createdAt: text("created_at")
      .notNull()
      .default(sql`CURRENT_TIMESTAMP`),
    updatedAt: text("updated_at")
      .notNull()
      .default(sql`CURRENT_TIMESTAMP`),
    // other user attributes
    name: text("name"),
    email: text("email"),
    emailVerified: integer("email_verified", { mode: "boolean" }),
    googleId: text("google_id"),
    username: text("username"),
    hashedPassword: text("hashed_password"),
    verificationLevel: real("verification_level").notNull().default(0),
    avatar: text("avatar"),
    // user attributes-info
    rut: text("rut"),
    birthdate: text("birthdate"),
    country: text("country"),
    phone: text("phone"),
  },
  (t) => ({
    emailIdx: index("email_idx").on(t.email),
    googleIdx: index("discord_idx").on(t.googleId),
  }),
);

export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;

export const sessions = sqliteTable(
  "sessions",
  {
    id: text("id").primaryKey().notNull(),
    userId: text("user_id")
      .notNull()
      .references(() => users.id),
    expiresAt: integer("expires_at").notNull(),
  },
  (t) => ({
    userIdx: index("user_idx").on(t.userId),
  }),
);

export const emailVerificationCodes = sqliteTable(
  "email_verification_codes",
  {
    id: integer("id").primaryKey().notNull(),
    userId: text("user_id").notNull(),
    email: text("email").notNull(),
    code: text("code").notNull(),
    expiresAt: integer("expiresAt", { mode: "timestamp" }),
  },
  (t) => ({
    emailIdx: index("email_idx").on(t.email),
  }),
);

export const passwordResetTokens = sqliteTable(
  "password_reset_tokens",
  {
    id: text("id").primaryKey().notNull(),
    userId: text("user_id").notNull(),
    expiresAt: integer("expiresAt", { mode: "timestamp" }).notNull(),
  },
  (t) => ({
    userIdx: index("user_idx").on(t.userId),
  }),
);

export const posts = sqliteTable(
  "posts",
  {
    id: text("id").primaryKey(),
    userId: text("user_id").notNull(),
    name: text("title").notNull(),
    status: text("status").notNull(),
    country: text("country"),
    city: text("city"),
    communes: text("communes"), //array
    verificationLevel: real("verification_level"),
    tags: text("tags"),
    createdAt: text("created_at")
      .notNull()
      .default(sql`CURRENT_TIMESTAMP`),
    updatedAt: text("updated_at")
      .notNull()
      .default(sql`CURRENT_TIMESTAMP`),
    // Atributes of the house the client is looking for
    atributes: text("atributes", { mode: "json" }).notNull().$type<{
      rooms: number;
      bathrooms: number;
      parking: number;
      meters: number;
      type: string;
      price: number;
      currency: string;
    }>(),
  },
  (t) => ({
    userIdx: index("user_idx").on(t.userId),
    createdAtIdx: index("post_created_at_idx").on(t.createdAt),
    atributesIdx: index("post_atributes_idx").on(t.atributes),
  }),
);

export const postRelations = relations(posts, ({ one }) => ({
  user: one(users, {
    fields: [posts.userId],
    references: [users.id],
  }),
}));
