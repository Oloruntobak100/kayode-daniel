import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const dest = path.join(
  path.resolve(path.dirname(fileURLToPath(import.meta.url)), ".."),
  "public",
  "avatar-hero.png"
);

const home = process.env.USERPROFILE || process.env.HOME || "";
const names = [
  "c__Users_hP_AppData_Roaming_Cursor_User_workspaceStorage_d31b4b000aca541e9b9ab8a1422d4012_images_animated-young-business-man-avatar-600nw-25749510951776625654-removebg-preview-8488fe8a-9981-4884-8ca8-d3dca4f1f320.png",
  "c__Users_hP_AppData_Roaming_Cursor_User_workspaceStorage_d31b4b000aca541e9b9ab8a1422d4012_images_animated-young-business-man-avatar-600nw-25749510951776625654-removebg-preview-a6567acc-516f-4e15-b024-61955c880ea8.png",
];

const roots = [
  path.join(home, ".cursor", "projects", "c-Development-portfolio", "assets"),
  path.join(home, ".cursor", "projects", "Development-portfolio", "assets"),
  "C:\\Users\\hP\\.cursor\\projects\\c-Development-portfolio\\assets",
];

for (const root of roots) {
  for (const n of names) {
    const abs = path.join(root, n);
    if (fs.existsSync(abs)) {
      fs.copyFileSync(abs, dest);
      console.log("OK", abs, "->", dest, fs.statSync(dest).size, "bytes");
      process.exit(0);
    }
  }
}

console.error("No source image found; add your PNG to public/avatar-hero.png");
process.exit(1);
