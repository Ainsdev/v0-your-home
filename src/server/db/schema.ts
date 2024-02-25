import { sql } from "drizzle-orm";
import { text, index, integer, sqliteTable } from "drizzle-orm/sqlite-core";
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
    verificationLevel: integer("verification_level").notNull().default(0),
    avatar: text("avatar"),
    // user attributes-info
    personalId: text("personalId"),
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
    id: integer("id", { mode: "number" }).primaryKey({ autoIncrement: true }),
    userId: text("user_id").notNull(),
    active: integer("status", { mode: "boolean" }).notNull().default(true),
    name: text("title").notNull(), // Name of the person who is looking for a house
    image: text("image"), // Image of the person who is looking for a house
    country: text("country").default("CL"),
    city: text("city"),
    communes: integer("communes"), // 039 represents the commune of the selected city
    verificationLevel: integer("verification_level"),
    tags: text("tags"), //array
    aditionalInfo: text("aditional_info"),
    publicContact: integer("show_phone", { mode: "boolean" })
      .notNull()
      .default(true),
    phone: text("phone"),
    createdAt: text("created_at")
      .notNull()
      .default(sql`CURRENT_TIMESTAMP`),
    updatedAt: text("updated_at")
      .notNull()
      .default(sql`CURRENT_TIMESTAMP`),
    // Atributes of the house the client is looking for (filters)
    rooms: text("rooms"), // 3-4
    people: integer("people"),
    bathrooms: text("bathrooms"), // 2-3
    parking: integer("parking", { mode: "boolean" }),
    meters: text("meters"), // 100-200
    type: integer("type"), // 2 (house), 1 (apartment)
    price: text("price"), // 100000-200000
    costs: text("costs"), // 10000-20000
  },
  (t) => ({
    userIdx: index("user_idx").on(t.userId),
    priceIdx: index("post_price_idx").on(t.price),
    cityIdx: index("post_city_idx").on(t.city),
  }),
);

export const postRelations = relations(posts, ({ one }) => ({
  user: one(users, {
    fields: [posts.userId],
    references: [users.id],
  }),
}));

export type Post = typeof posts.$inferSelect;

// This table is used to: send a Direct message to a post (ONLY ONE TIME) -> The user send an link,phone,email and message to the post owner
export const messages = sqliteTable(
  "messages",
  {
    id: integer("id", { mode: "number" }).primaryKey({ autoIncrement: true }),
    postId: integer("post_id").notNull(),
    userId: text("user_id").notNull(),
    link: text("link"),
    phone: integer("phone").notNull(),
    email: text("email"),
    message: text("message").notNull(),
    createdAt: text("created_at")
      .notNull()
      .default(sql`CURRENT_TIMESTAMP`),
  },
  (t) => ({
    userIdx: index("user_idx").on(t.userId),
    postIdx: index("post_idx").on(t.postId),
  }),
);

export type Message = typeof messages.$inferSelect;

//KYC VERIFICATION
export const kycVerification = sqliteTable(
  "kyc_verification",
  {
    id: integer("id", { mode: "number" }).primaryKey({ autoIncrement: true }),
    userId: text("user_id")
      .notNull()
      .references(() => users.id),
    verificationLevel: integer("verification_level").notNull().default(0),
    passed: integer("status", { mode: "boolean" }).notNull().default(false),
    onReview: integer("on_review", { mode: "boolean" }).notNull().default(false),
    documents: text("documents"), //array
    createdAt: text("created_at")
      .notNull()
      .default(sql`CURRENT_TIMESTAMP`),
    updatedAt: text("updated_at")
      .notNull()
      .default(sql`CURRENT_TIMESTAMP`),
  },
  (t) => ({
    userIdx: index("user_idx").on(t.userId),
  }),
);
