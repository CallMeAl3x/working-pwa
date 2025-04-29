import type { NextApiRequest, NextApiResponse } from "next";
import fs from "fs";
import path from "path";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const data = req.body;
    // Save to /public/data.json
    const dataFile = path.join(process.cwd(), "public", "data.json");
    let existing = [];
    try {
      if (fs.existsSync(dataFile)) {
        const file = fs.readFileSync(dataFile, "utf-8");
        existing = JSON.parse(file);
      }
    } catch {}
    existing.push(data);
    fs.writeFileSync(dataFile, JSON.stringify(existing, null, 2));
    console.log("Form submission:", data);
    return res.status(200).json({ success: true });
  }

  res.setHeader("Allow", ["POST"]);
  res.status(405).end(`Method ${req.method} Not Allowed`);
}
