import sharp from 'sharp';
import { mkdir } from 'node:fs/promises';
import path from 'node:path';

const assetsDir =
  'C:/Users/Ritesh/.cursor/projects/c-bagicha-daily/assets';
const outDir = path.resolve('public/products');

const images = [
  {
    src: 'c__Users_Ritesh_AppData_Roaming_Cursor_User_workspaceStorage_f4df3297f51879eccf4c1bcdd98eab79_images_WhatsApp_Image_2026-09-07_at_7.57.13_PM-d0f212f1-fbff-4471-89f9-bc8a88255b66.jpg',
    name: 'royal-delicious',
  },
  {
    src: 'c__Users_Ritesh_AppData_Roaming_Cursor_User_workspaceStorage_f4df3297f51879eccf4c1bcdd98eab79_images_WhatsApp_Image_2026-09-07_at_7.58.06_PM-4ffbe57c-34e5-4ac2-bc2f-6cd80cabb7c0.jpg',
    name: 'granny-smith',
  },
];

await mkdir(outDir, { recursive: true });

for (const { src, name } of images) {
  const input = path.join(assetsDir, src);

  await sharp(input)
    .rotate()
    .resize(1200, 1200, { fit: 'cover', position: 'centre' })
    .webp({ quality: 82, effort: 6 })
    .toFile(path.join(outDir, `${name}.webp`));

  await sharp(input)
    .rotate()
    .resize(600, 450, { fit: 'cover', position: 'centre' })
    .webp({ quality: 80, effort: 6 })
    .toFile(path.join(outDir, `${name}-card.webp`));

  console.log(`Optimized ${name}`);
}
