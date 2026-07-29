'use client';

interface ImageMetaProps {
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

export default function ImageMeta({ exif }: ImageMetaProps) {
  const items = [
    { label: 'Cámara', value: exif.camera },
    { label: 'Lente', value: exif.lens },
    { label: 'Fecha', value: exif.date },
    { label: 'Apertura', value: exif.aperture },
    { label: 'Velocidad', value: exif.shutterSpeed },
    { label: 'ISO', value: exif.iso },
    { label: 'Focal', value: exif.focalLength },
  ].filter(item => item.value !== '');

  if (items.length === 0) return null;

  return (
    <div className="mt-3 pt-3 border-t border-white/10">
      <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-xs text-white/60">
        {items.map(item => (
          <div key={item.label} className="flex justify-between">
            <span className="text-white/40">{item.label}</span>
            <span className="text-white/80">{item.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}