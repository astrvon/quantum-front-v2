import { promises as fs } from "fs";
import path from "path";

export async function loadMessages(locale: string) {
  const dirPath = path.join(process.cwd(), "messages", locale);
  const files = await fs.readdir(dirPath);

  const messages: Record<string, string> = {};

  for (const file of files) {
    if (!file.endsWith(".json")) continue;

    const filePath = path.join(dirPath, file);
    const fileContent = await fs.readFile(filePath, "utf8");
    const json = JSON.parse(fileContent);

    Object.assign(messages, json);
  }

  return messages;
}
