import type { Express } from "express";
import type { Server } from "http";
import { api } from "@shared/routes";
import { z } from "zod";
import * as XLSX from "xlsx";
import path from "path";
import fs from "fs/promises";

type WaitingListEntry = {
  id: number;
  name: string;
  email: string;
  phone?: string;
  createdAt: string;
};

const filePath = path.join(process.cwd(), "waiting_list.xlsx");

async function saveToExcel(entry: WaitingListEntry) {
  let data: WaitingListEntry[] = [];

  try {
    const file = await fs.readFile(filePath);
    const workbook = XLSX.read(file);
    const sheet = workbook.Sheets["Waiting List"];
    if (sheet) {
      data = XLSX.utils.sheet_to_json(sheet);
    }
  } catch {
    // File does not exist yet → first entry
  }

  data.push(entry);

  const worksheet = XLSX.utils.json_to_sheet(data);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Waiting List");

  const buf = XLSX.write(workbook, { type: "buffer", bookType: "xlsx" });
  await fs.writeFile(filePath, buf);
}

export async function registerRoutes(
  _httpServer: Server,
  app: Express
): Promise<Server> {

  app.post(api.waitingList.create.path, async (req, res) => {
    try {
      const input = api.waitingList.create.input.parse(req.body);

      const entry: WaitingListEntry = {
        id: Date.now(),
        name: input.name,
        email: input.email,
        phone: input.phone,
        createdAt: new Date().toISOString(),
      };

      await saveToExcel(entry);

      console.log(
        `[Waiting List] New entry: ${entry.name} (${entry.email})`
      );

      res.status(201).json(entry);
    } catch (err) {
      console.error("❌ Waiting list error:", err);

      if (err instanceof z.ZodError) {
        return res.status(400).json({
          message: err.errors[0].message,
          field: err.errors[0].path.join("."),
        });
      }

      res.status(500).json({ message: "Internal server error" });
    }
  });

  return _httpServer;
}
