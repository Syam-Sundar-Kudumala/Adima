import { pgTable, text, serial, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const waitingList = pgTable("waiting_list", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  phone: text("phone").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertWaitingListSchema = createInsertSchema(waitingList).pick({
  name: true,
  email: true,
  phone: true,
});

export type InsertWaitingList = z.infer<typeof insertWaitingListSchema>;
export type WaitingListEntry = typeof waitingList.$inferSelect;
