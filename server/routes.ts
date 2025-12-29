import type { Express } from "express";
import type { Server } from "http";
import { storage } from "./storage";
import { api } from "@shared/routes";
import { z } from "zod";
import { Resend } from "resend";
import * as XLSX from "xlsx";
import path from "path";
import fs from "fs/promises";

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

async function updateExcelFile() {
  try {
    const entries = await storage.getWaitingListEntries();
    const data = entries.map(entry => ({
      ID: entry.id,
      Name: entry.name,
      Email: entry.email,
      Phone: entry.phone,
      "Joined Date": entry.createdAt ? new Date(entry.createdAt).toLocaleString() : ""
    }));
    
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Waiting List");
    
    const buf = XLSX.write(workbook, { type: "buffer", bookType: "xlsx" });
    const filePath = path.join(process.cwd(), "waiting_list.xlsx");
    await fs.writeFile(filePath, buf);
    console.log(`[Excel] Updated waiting_list.xlsx at ${filePath}`);
  } catch (err) {
    console.error("[Excel] Failed to update excel file:", err);
  }
}

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

      // Update Excel file
      await updateExcelFile();

      // Send email notification if Resend is configured
      if (resend) {
        try {
          const { data, error } = await resend.emails.send({
            from: "11thOne <delivered@resend.dev>",
            to: ["syamsundark1999@gmail.com"],
            subject: "New Waiting List Joiner: " + entry.name,
            text: `A new user has joined the 11thOne waiting list.\n\nName: ${entry.name}\nEmail: ${entry.email}\nPhone: ${entry.phone}\nJoined at: ${entry.createdAt}`,
          });
          
          if (error) {
            console.error("[Notification] Resend error:", error);
          } else {
            console.log("[Notification] Email request sent:", data?.id);
          }
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
