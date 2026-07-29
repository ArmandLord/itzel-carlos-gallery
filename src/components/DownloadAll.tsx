'use client';

export default function DownloadAll() {
  return (
    <a
      href="/downloads/media.zip"
      download
      className="bg-black hover:bg-gray-900 text-white px-5 py-2.5 text-sm font-medium tracking-wide rounded-full transition-colors duration-300 shadow-lg"
    >
      Descargar todas
    </a>
  );
}