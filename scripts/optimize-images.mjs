import sharp from 'sharp';
import fs from 'node:fs/promises';
import path from 'node:path';

// ==========================================
// UNIFIED IMAGE OPTIMIZATION SCRIPT
// Run with: node scripts/optimize-images.mjs
// ==========================================

const MAIN_ASSETS_DIR = 'C:/Users/Ritesh/.cursor/projects/c-bagicha-daily/assets';
const PRODUCTS_OUT_DIR = path.resolve('public/products');
const GALLERY_OUT_DIR = path.resolve('public/products/gallery');

// 1. ADD MAIN PRODUCT IMAGES HERE
// These will be converted into a large 1200x1200 image and a 600x450 card image.
const mainProductImages = [
  // Example:
  // { 
  //   src: 'WhatsApp_Image_example.jpg', // File must be inside MAIN_ASSETS_DIR
  //   name: 'new-apple-variety'
  // },
];

// 2. ADD GALLERY THUMBNAIL IMAGES HERE
// These will be converted into 1000x1000 images inside the gallery folder.
const galleryImages = [
  { 
    src: 'C:\\Users\\Ritesh\\.gemini\\antigravity-ide\\brain\\def9751d-8c58-407d-89ef-f681ae8cece6\\.user_uploaded\\media_1789233775938.jpg',
    prefix: 'golden'
  },
  { 
    src: 'C:\\Users\\Ritesh\\.gemini\\antigravity-ide\\brain\\def9751d-8c58-407d-89ef-f681ae8cece6\\.user_uploaded\\media_1789233771977.jpg',
    prefix: 'golden'
  }
];

async function optimizeImages() {
  await fs.mkdir(PRODUCTS_OUT_DIR, { recursive: true });
  await fs.mkdir(GALLERY_OUT_DIR, { recursive: true });

  // Process Main Product Images
  if (mainProductImages.length > 0) {
    console.log('--- Processing Main Images ---');
    for (const { src, name } of mainProductImages) {
      const input = path.join(MAIN_ASSETS_DIR, src);
      try {
        await sharp(input)
          .rotate()
          .resize(1200, 1200, { fit: 'cover', position: 'centre' })
          .webp({ quality: 82, effort: 6 })
          .toFile(path.join(PRODUCTS_OUT_DIR, `${name}.webp`));

        await sharp(input)
          .rotate()
          .resize(600, 450, { fit: 'cover', position: 'centre' })
          .webp({ quality: 80, effort: 6 })
          .toFile(path.join(PRODUCTS_OUT_DIR, `${name}-card.webp`));

        console.log(`Optimized Main Product: ${name}`);
      } catch (e) {
        console.error(`Failed to process main image ${src}:`, e);
      }
    }
  }

  // Process Gallery Images
  if (galleryImages.length > 0) {
    console.log('--- Processing Gallery Images ---');
    const galleryGroups = {};
    for (const { src, prefix } of galleryImages) {
      if (!galleryGroups[prefix]) galleryGroups[prefix] = 0;
      galleryGroups[prefix]++;
      
      const dest = path.join(GALLERY_OUT_DIR, `${prefix}-${galleryGroups[prefix]}.webp`);
      try {
        await sharp(src)
          .rotate()
          .resize(1000, 1000, { fit: 'inside', withoutEnlargement: true })
          .webp({ quality: 80, effort: 6 })
          .toFile(dest);
        console.log(`Optimized Gallery Image: ${dest}`);
      } catch (e) {
        console.error(`Failed to process gallery image ${src}:`, e);
      }
    }
  }
  
  console.log('Finished image optimization run!');
}

optimizeImages();
