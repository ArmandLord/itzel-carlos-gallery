'use client';

import { useEffect, useState } from 'react';
import ImageCard from './ImageCard';
import ImageMeta from './ImageMeta';

interface MediaImage {
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
}

interface MasonryGridProps {
  images: MediaImage[];
}

export default function MasonryGrid({ images }: MasonryGridProps) {
  const [loadedImages, setLoadedImages] = useState<MediaImage[]>([]);
  const [activeIndex, setActiveIndex] = useState<number>(-1);

  useEffect(() => {
    if (images.length > 0) {
      setLoadedImages(images);
    }
  }, [images]);

  useEffect(() => {
    if (activeIndex < 0) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setActiveIndex(-1);
      if (e.key === 'ArrowLeft') setActiveIndex((i) => Math.max(0, i - 1));
      if (e.key === 'ArrowRight') setActiveIndex((i) => Math.min(loadedImages.length - 1, i + 1));
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [activeIndex, loadedImages.length]);

  return (
    <div className="relative">
      <div
        className="columns-2 sm:columns-3 lg:columns-4 xl:columns-5 gap-4 space-y-4 px-4 sm:px-6"
        style={{ columnWidth: '250px' }}
      >
        {loadedImages.map((img, index) => (
          <div key={img.id} className="break-inside-avoid mb-4">
            <ImageCard
              id={img.id}
              thumbSrc={img.thumbSrc}
              fullSrc={img.fullSrc}
              aspectRatio={img.aspectRatio}
              onClick={() => setActiveIndex(index)}
            />
          </div>
        ))}
      </div>

      {activeIndex >= 0 && (
        <div
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center"
          onClick={() => setActiveIndex(-1)}
          role="dialog"
          aria-modal="true"
        >
          <button
            className="absolute top-4 right-4 text-white/80 hover:text-white text-3xl leading-none p-2 z-10"
            onClick={() => setActiveIndex(-1)}
            aria-label="Cerrar"
          >
            ×
          </button>

          <div className="relative max-w-[90vw] max-h-[90vh]">
            <img
              src={loadedImages[activeIndex].fullSrc}
              alt={loadedImages[activeIndex].id}
              className="max-w-full max-h-[70vh] object-contain rounded-sm shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            />

            <ImageMeta exif={loadedImages[activeIndex].exif} />

            <div className="flex items-center justify-center gap-4 mt-3">
              <a
                href={loadedImages[activeIndex].fullSrc}
                download={loadedImages[activeIndex].id + '.jpg'}
                className="bg-white/90 hover:bg-white text-gray-800 px-5 py-2 text-sm font-medium tracking-wide rounded-full transition-all duration-200 shadow-sm"
                onClick={(e) => e.stopPropagation()}
              >
                Descargar
              </a>
            </div>

            {activeIndex > 0 && (
              <button
                className="absolute left-4 top-1/2 -translate-y-1/2 text-white/50 hover:text-white text-3xl p-2 transition-colors"
                onClick={(e) => { e.stopPropagation(); setActiveIndex(activeIndex - 1); }}
                aria-label="Foto anterior"
              >
                ‹
              </button>
            )}

            {activeIndex < loadedImages.length - 1 && (
              <button
                className="absolute right-4 top-1/2 -translate-y-1/2 text-white/50 hover:text-white text-3xl p-2 transition-colors"
                onClick={(e) => { e.stopPropagation(); setActiveIndex(activeIndex + 1); }}
                aria-label="Foto siguiente"
              >
                ›
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}