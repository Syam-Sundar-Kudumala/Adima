import { waitingList, type InsertWaitingList, type WaitingListEntry } from "@shared/schema";
import { db } from "./db";

export interface IStorage {
  createWaitingListEntry(entry: InsertWaitingList): Promise<WaitingListEntry>;
}

export class DatabaseStorage implements IStorage {
  async createWaitingListEntry(entry: InsertWaitingList): Promise<WaitingListEntry> {
    const [created] = await db.insert(waitingList).values(entry).returning();
    return created;
  }
}

export const storage = new DatabaseStorage();
