import Products from '../components/Products';
import Features from '../components/Features';

export default function ProductsPage() {
  return (
    <>
      <section className="py-16 bg-gradient-to-b from-orchard-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-display text-4xl md:text-5xl font-bold text-orchard-800 mb-4">
            Our Products
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Explore our selection of premium Himalayan apples. Each variety is carefully chosen for its taste and quality.
          </p>
        </div>
      </section>
      <Products
        title="All Varieties"
        subtitle="Choose your favorite. All our apples are farm-fresh and delivered with care."
      />
      <Features />
    </>
  );
}
