import { pgTable, foreignKey, varchar, text, timestamp, index, vector, primaryKey, unique, integer, boolean } from "drizzle-orm/pg-core"
  import { sql } from "drizzle-orm"
import { UserRole } from "@/server/db/schema";



export const resources = pgTable("resources", {
	id: varchar("id", { length: 191 }).primaryKey().notNull(),
	content: text("content").notNull(),
	userId: text("userId").notNull().references(() => user.id, { onDelete: "cascade" } ),
	created_at: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
	updated_at: timestamp("updated_at", { mode: 'string' }).defaultNow().notNull(),
});

export const embeddings = pgTable("embeddings", {
	id: varchar("id", { length: 191 }).primaryKey().notNull(),
	resource_id: varchar("resource_id", { length: 191 }).references(() => resources.id, { onDelete: "cascade" } ),
	content: text("content").notNull(),
	embedding: vector("embedding", { dimensions: 1536 }).notNull(),
	userId: varchar("userId", { length: 191 }).notNull().references(() => user.id, { onDelete: "cascade" } ),
},
(table) => {
	return {
		embeddingIndex: index("embeddingIndex").using("hnsw", table.embedding.op("vector_cosine_ops")),
	}
});

export const session = pgTable("session", {
	sessionToken: text("sessionToken").primaryKey().notNull(),
	userId: text("userId").notNull().references(() => user.id, { onDelete: "cascade" } ),
	expires: timestamp("expires", { mode: 'string' }).notNull(),
});

export const user = pgTable("user", {
	id: text("id").primaryKey().notNull(),
	name: text("name"),
	email: text("email").notNull(),
	emailVerified: timestamp("emailVerified", { mode: 'string' }),
	image: text("image"),
	password: text("password"),
	role: UserRole('role').default('user').notNull(),
});

export const verificationToken = pgTable("verificationToken", {
	identifier: text("identifier").notNull(),
	token: text("token").notNull(),
	expires: timestamp("expires", { mode: 'string' }).notNull(),
},
(table) => {
	return {
		verificationToken_identifier_token_pk: primaryKey({ columns: [table.identifier, table.token], name: "verificationToken_identifier_token_pk"}),
	}
});

export const authenticator = pgTable("authenticator", {
	credentialID: text("credentialID").notNull(),
	userId: text("userId").notNull().references(() => user.id, { onDelete: "cascade" } ),
	providerAccountId: text("providerAccountId").notNull(),
	credentialPublicKey: text("credentialPublicKey").notNull(),
	counter: integer("counter").notNull(),
	credentialDeviceType: text("credentialDeviceType").notNull(),
	credentialBackedUp: boolean("credentialBackedUp").notNull(),
	transports: text("transports"),
},
(table) => {
	return {
		authenticator_userId_credentialID_pk: primaryKey({ columns: [table.credentialID, table.userId], name: "authenticator_userId_credentialID_pk"}),
		authenticator_credentialID_unique: unique("authenticator_credentialID_unique").on(table.credentialID),
	}
});

export const account = pgTable("account", {
	userId: text("userId").notNull().references(() => user.id, { onDelete: "cascade" } ),
	type: text("type").notNull(),
	provider: text("provider").notNull(),
	providerAccountId: text("providerAccountId").notNull(),
	refresh_token: text("refresh_token"),
	access_token: text("access_token"),
	expires_at: integer("expires_at"),
	token_type: text("token_type"),
	scope: text("scope"),
	id_token: text("id_token"),
	session_state: text("session_state"),
},
(table) => {
	return {
		account_provider_providerAccountId_pk: primaryKey({ columns: [table.provider, table.providerAccountId], name: "account_provider_providerAccountId_pk"}),
	}
});