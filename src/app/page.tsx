import fs from 'fs';
import path from 'path';
import MasonryGrid from '@/components/MasonryGrid';
import Hero from '@/components/Hero';
import DownloadAll from '@/components/DownloadAll';

type MetaImage = {
  id: string;
  filename: string;
  width: number;
  height: number;
  aspectRatio: number;
  fullSrc: string;
  thumbSrc: string;
  exif: {
    camera: string;
    lens: string;
    date: string;
    aperture: string;
    shutterSpeed: string;
    iso: string;
    focalLength: string;
  };
};

export const metadata = {
  title: 'Galería Fotográfica | Itzel & Carlos',
  description: 'Galería de fotografías de Itzel y Carlos. Explora nuestras mejores fotos capturadas con una Sony ILCE-6700.',
  openGraph: {
    title: 'Galería Fotográfica | Itzel & Carlos',
    description: 'Galería de fotografías de Itzel y Carlos.',
    type: 'website',
    images: ['/hero.jpg'],
  },
};

function getImages(): MetaImage[] {
  const dataPath = path.join(process.cwd(), 'public', 'data', 'images.json');
  const raw = fs.readFileSync(dataPath, 'utf-8');
  return JSON.parse(raw) as MetaImage[];
}

export default function Home() {
  const images = getImages();

  return (
    <main className="min-h-screen bg-white">
      <Hero />

      <section className="py-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-6 px-4 sm:px-6">
            <div>
              <h2 className="text-2xl sm:text-3xl font-light tracking-wide text-gray-800">
                Galería
              </h2>
              <p className="text-sm text-gray-400 mt-1 tracking-wide">
                {images.length} fotografías
              </p>
            </div>
            <DownloadAll />
          </div>

          <MasonryGrid images={images} />
        </div>
      </section>
    </main>
  );
}