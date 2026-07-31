'use client';

// test
export default function Hero() {
  return (
    <section className="relative h-[60vh] min-h-[400px] flex items-center justify-center overflow-hidden bg-cover bg-center" style={{ backgroundImage: 'url(/hero.jpg)' }}>
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-black/30 z-10" />
      <div className="relative z-20 text-center px-4">
        <h1 className="text-5xl sm:text-6xl md:text-7xl font-light tracking-[0.2em] text-white mb-4" style={{ textShadow: '0 2px 20px rgba(0,0,0,0.5)' }}>
          Itzel & Carlos
        </h1>
        <p className="text-lg sm:text-xl text-white/90 font-light tracking-wider" style={{ textShadow: '0 1px 10px rgba(0,0,0,0.5)' }}>
          Fotografías
        </p>
      </div>
    </section>
  );
}