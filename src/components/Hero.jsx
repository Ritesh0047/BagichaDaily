import { Link } from 'react-router-dom';

export default function Hero() {
  return (
    <section className="relative h-[70vh] min-h-[500px] flex items-center justify-center overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1560807707-8cc77767d783?w=1920&q=80')`,
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-orchard-900/80 via-orchard-800/60 to-orchard-900/80" />
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 text-center text-white">
        <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
          Fresh Apples Direct From Himalayan Farms
        </h1>
        <p className="text-lg sm:text-xl md:text-2xl text-orchard-100 mb-10 max-w-2xl mx-auto">
          Premium quality apples harvested at peak ripeness. Farm to your doorstep, naturally.
        </p>
        <Link
          to="/products"
          className="inline-flex items-center gap-2 bg-white text-orchard-800 px-8 py-4 rounded-full font-semibold text-lg hover:bg-orchard-50 hover:scale-105 transition-all shadow-lg"
        >
          Shop Now
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </Link>
      </div>
    </section>
  );
}
