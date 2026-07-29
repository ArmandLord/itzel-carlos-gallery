const sharp = require('sharp');
const exifr = require('exifr');
const fs = require('fs');
const path = require('path');

const MEDIA_DIR = path.join(process.cwd(), 'public', 'media');
const THUMBS_DIR = path.join(process.cwd(), 'public', 'media', 'thumbs');
const METADATA_FILE = path.join(process.cwd(), 'src', 'data', 'images.json');
const THUMB_WIDTH = 600;

async function ensureDir(dir) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

function formatAperture(fNumber) {
  if (!fNumber) return '';
  if (typeof fNumber === 'number') {
    return 'f/' + fNumber.toFixed(1);
  }
  return 'f/' + parseFloat(fNumber).toFixed(1);
}

function formatShutterSpeed(exposureTime) {
  if (!exposureTime) return '';
  if (typeof exposureTime === 'number') {
    if (exposureTime < 1) {
      return (1 / exposureTime).toFixed(0) + 's';
    }
    return exposureTime + 's';
  }
  return String(exposureTime);
}

function formatFocalLength(focalLength) {
  if (!focalLength) return '';
  if (typeof focalLength === 'number') {
    return focalLength + 'mm';
  }
  return String(focalLength);
}

async function extractExif(filePath) {
  try {
    const exif = await exifr.parse(filePath);
    if (!exif) return {};

    return {
      camera: exif.Make && exif.Model ? exif.Make + ' ' + exif.Model : (exif.Make || exif.Model || ''),
      lens: exif.LensModel || exif.Lens || '',
      date: exif.DateTimeOriginal || exif.DateTime || '',
      aperture: formatAperture(exif.FNumber),
      shutterSpeed: formatShutterSpeed(exif.ExposureTime),
      iso: exif.ISO ? String(exif.ISO) : '',
      focalLength: formatFocalLength(exif.FocalLength),
    };
  } catch {
    return {};
  }
}

async function generate() {
  await ensureDir(THUMBS_DIR);

  const files = fs.readdirSync(MEDIA_DIR)
    .filter(f => /\.(jpg|jpeg|png|webp)$/i.test(f))
    .sort();

  if (files.length === 0) {
    console.log('No images found in public/media/');
    process.exit(0);
  }

  console.log('Found ' + files.length + ' images. Generating thumbnails and extracting EXIF...');
  const metadata = [];
  const start = Date.now();

  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    const inputPath = path.join(MEDIA_DIR, file);
    const baseName = path.parse(file).name;
    const thumbName = baseName + '.webp';
    const thumbPath = path.join(THUMBS_DIR, thumbName);

    try {
      const img = sharp(inputPath);
      const meta = await img.metadata();
      const width = meta.width;
      const height = meta.height;

      if (!width || !height) {
        console.warn('  Skipping ' + file + ': no dimensions');
        continue;
      }

      await img
        .resize(THUMB_WIDTH, null, { fit: 'inside', withoutEnlargement: true })
        .webp({ quality: 80 })
        .toFile(thumbPath);

      const exif = await extractExif(inputPath);

      metadata.push({
        id: baseName,
        filename: file,
        width: width,
        height: height,
        aspectRatio: +(width / height).toFixed(4),
        fullSrc: '/media/' + file,
        thumbSrc: '/media/thumbs/' + thumbName,
        exif: exif,
      });

      const elapsed = ((Date.now() - start) / 1000).toFixed(1);
      const pct = Math.round(((i + 1) / files.length) * 100);
      process.stdout.write('\r  [' + pct + '%] ' + (i + 1) + '/' + files.length + ' - ' + elapsed + 's');
    } catch (err) {
      console.error('\n  Error on ' + file + ': ' + err.message);
    }
  }

  fs.writeFileSync(METADATA_FILE, JSON.stringify(metadata, null, 2));
  console.log('\n\nDone! Generated ' + metadata.length + ' thumbnails in ' + ((Date.now() - start) / 1000).toFixed(1) + 's');
  console.log('Metadata saved to src/data/images.json');
}

generate().catch(console.error);
