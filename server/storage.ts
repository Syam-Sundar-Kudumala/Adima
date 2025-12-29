import { waitingList, type InsertWaitingList, type WaitingListEntry } from "@shared/schema";
import { db } from "./db";

export interface IStorage {
  createWaitingListEntry(entry: InsertWaitingList): Promise<WaitingListEntry>;
  getWaitingListEntries(): Promise<WaitingListEntry[]>;
}

export class DatabaseStorage implements IStorage {
  async createWaitingListEntry(entry: InsertWaitingList): Promise<WaitingListEntry> {
    const [created] = await db.insert(waitingList).values(entry).returning();
    return created;
  }

  async getWaitingListEntries(): Promise<WaitingListEntry[]> {
    return await db.select().from(waitingList);
  }
}

export const storage = new DatabaseStorage();
