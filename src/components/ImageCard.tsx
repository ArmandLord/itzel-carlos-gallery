'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useLazyLoad } from '@/hooks/useLazyLoad';

interface ImageCardProps {
  id: string;
  thumbSrc: string;
  fullSrc: string;
  aspectRatio: number;
  onClick: () => void;
}

export default function ImageCard({ id, thumbSrc, fullSrc, aspectRatio, onClick }: ImageCardProps) {
  const { ref, isVisible } = useLazyLoad();
  const [loaded, setLoaded] = useState(false);

  return (
    <div
      ref={ref}
      className="relative group cursor-pointer overflow-hidden rounded-sm bg-gray-200"
      style={{ aspectRatio: aspectRatio }}
      onClick={onClick}
      role="button"
      tabIndex={0}
      aria-label={'Ver foto ' + id}
      onKeyDown={(e) => { if (e.key === 'Enter') onClick(); }}
    >
      {isVisible && (
        <Image
          src={thumbSrc}
          alt={id}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className={`object-cover transition-opacity duration-500 ${loaded ? 'opacity-100' : 'opacity-0'}`}
          onLoad={() => setLoaded(true)}
          loading="lazy"
        />
      )}

      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-end p-3 opacity-0 group-hover:opacity-100">
        <div className="flex items-center gap-2">
          <a
            href={fullSrc}
            download={id + '.jpg'}
            onClick={(e) => e.stopPropagation()}
            className="bg-white/90 hover:bg-white text-gray-800 px-3 py-1.5 text-xs font-medium tracking-wide rounded-full transition-all duration-200 shadow-sm"
            aria-label={'Descargar foto ' + id}
          >
            Descargar
          </a>
        </div>
      </div>
    </div>
  );
}