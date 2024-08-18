import { relations } from "drizzle-orm/relations";
import { user, resources, embeddings, session, authenticator, account } from "./schema";

export const resourcesRelations = relations(resources, ({one, many}) => ({
	user: one(user, {
		fields: [resources.userId],
		references: [user.id]
	}),
	embeddings: many(embeddings),
}));

export const userRelations = relations(user, ({many}) => ({
	resources: many(resources),
	embeddings: many(embeddings),
	sessions: many(session),
	authenticators: many(authenticator),
	accounts: many(account),
}));

export const embeddingsRelations = relations(embeddings, ({one}) => ({
	resource: one(resources, {
		fields: [embeddings.resource_id],
		references: [resources.id]
	}),
	user: one(user, {
		fields: [embeddings.userId],
		references: [user.id]
	}),
}));

export const sessionRelations = relations(session, ({one}) => ({
	user: one(user, {
		fields: [session.userId],
		references: [user.id]
	}),
}));

export const authenticatorRelations = relations(authenticator, ({one}) => ({
	user: one(user, {
		fields: [authenticator.userId],
		references: [user.id]
	}),
}));

export const accountRelations = relations(account, ({one}) => ({
	user: one(user, {
		fields: [account.userId],
		references: [user.id]
	}),
}));