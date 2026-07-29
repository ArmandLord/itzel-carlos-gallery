'use client';

import { useState } from 'react';
import JSZip from 'jszip';

export default function DownloadAll() {
  const [downloading, setDownloading] = useState(false);

  async function handleDownloadAll() {
    setDownloading(true);
    try {
      const zip = new JSZip();
      const resp = await fetch('/data/images.json');
      const images = await resp.json();

      await Promise.all(
        images.map(async (img: { id: string; fullSrc: string }) => {
          const res = await fetch(img.fullSrc);
          const blob = await res.blob();
          const baseName = img.id + '.jpg';
          zip.file(baseName, blob);
        })
      );

      const content = await zip.generateAsync({ type: 'blob' });
      const url = URL.createObjectURL(content);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'itzel-carlos.zip';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error('Download failed:', err);
      alert('Error downloading photos. Try downloading them individually.');
    }
    setDownloading(false);
  }

  return (
    <button
      onClick={handleDownloadAll}
      disabled={downloading}
      className="bg-black hover:bg-gray-900 disabled:opacity-50 text-white px-5 py-2.5 text-sm font-medium tracking-wide rounded-full transition-colors duration-300 shadow-lg"
    >
      {downloading ? 'Creando ZIP...' : 'Descargar todas'}
    </button>
  );
}