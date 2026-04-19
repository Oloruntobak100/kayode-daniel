import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const home = process.env.USERPROFILE || process.env.HOME || "";
const assets = path.join(
  home,
  ".cursor",
  "projects",
  "c-Development-portfolio",
  "assets"
);

const names = [
  "c__Users_hP_AppData_Roaming_Cursor_User_workspaceStorage_d31b4b000aca541e9b9ab8a1422d4012_images_kay-ada61b03-6053-4a2e-bc22-764ebe92d459.png",
  "c__Users_hP_AppData_Roaming_Cursor_User_workspaceStorage_d31b4b000aca541e9b9ab8a1422d4012_images_image-c9d63a46-4d8e-47f6-b4e6-762f971162b9.png",
];

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const publicDir = path.join(root, "public");

let source;
for (const n of names) {
  const p = path.join(assets, n);
  if (fs.existsSync(p)) {
    source = p;
    break;
  }
}

if (!source) {
  console.error("Profile source not found in assets");
  process.exit(1);
}

const buf = fs.readFileSync(source);
const isPng = buf[0] === 0x89 && buf[1] === 0x50;
const ext = isPng ? "png" : "jpg";
const dest = path.join(publicDir, `profile.${ext}`);

fs.writeFileSync(dest, buf);
console.log("OK", path.basename(source), "->", `public/profile.${ext}`, buf.length, "bytes");
