import type { Express } from "express";
import type { Server } from "http";
import { storage } from "./storage";
import { api } from "@shared/routes";
import { z } from "zod";
import { Resend } from "resend";

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

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

      // Send email notification if Resend is configured
      if (resend) {
        try {
          await resend.emails.send({
            from: "11thOne Waiting List <onboarding@resend.dev>",
            to: ["syamsundark1999@gmail.com"],
            subject: "New Waiting List Joiner: " + entry.name,
            text: `A new user has joined the 11thOne waiting list.\n\nName: ${entry.name}\nEmail: ${entry.email}\nPhone: ${entry.phone}\nJoined at: ${entry.createdAt}`,
          });
          console.log("[Notification] Email sent successfully to syamsundark1999@gmail.com");
        } catch (emailError) {
          console.error("[Notification] Failed to send email:", emailError);
        }
      }
      
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
