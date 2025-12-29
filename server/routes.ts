import type { Express } from "express";
import type { Server } from "http";
import { storage } from "./storage";
import { api } from "@shared/routes";
import { z } from "zod";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  app.post(api.waitingList.create.path, async (req, res) => {
    try {
      const input = api.waitingList.create.input.parse(req.body);
      const entry = await storage.createWaitingListEntry(input);
      
      // Log for MVP notification simulation
      console.log(`[Notification] New waiting list sign-up: ${entry.email} (${entry.name})`);
      
      res.status(201).json(entry);
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({
          message: err.errors[0].message,
          field: err.errors[0].path.join('.'),
        });
      }
      res.status(500).json({ message: "Internal server error" });
    }
  });

  return httpServer;
}
