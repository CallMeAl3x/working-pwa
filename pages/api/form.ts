import type { NextApiRequest, NextApiResponse } from "next";
import fs from "fs";
import path from "path";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const data = req.body;
    // Save to /tmp/data.json (writable in most environments)
    const dataFile = path.join(process.cwd(), "tmp", "data.json");
    let existing = [];
    try {
      if (fs.existsSync(dataFile)) {
        const file = fs.readFileSync(dataFile, "utf-8");
        existing = JSON.parse(file);
      }
    } catch {}
    existing.push(data);
    fs.mkdirSync(path.dirname(dataFile), { recursive: true });
    fs.writeFileSync(dataFile, JSON.stringify(existing, null, 2));
    return res.status(200).json({ success: true });
  }
  if (req.method === "GET") {
    // Serve the data for testing
    const dataFile = path.join(process.cwd(), "tmp", "data.json");
    let existing = [];
    try {
      if (fs.existsSync(dataFile)) {
        const file = fs.readFileSync(dataFile, "utf-8");
        existing = JSON.parse(file);
      }
    } catch {}
    return res.status(200).json(existing);
  }
  res.setHeader("Allow", ["POST", "GET"]);
  res.status(405).end(`Method ${req.method} Not Allowed`);
}
