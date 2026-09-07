import { products } from '../data/products';
import ProductCard from './ProductCard';

export default function Products({ title = 'Our Apple Collection', subtitle, limit }) {
  const items = limit ? products.slice(0, limit) : products;

  return (
    <section className="py-16 md:py-24 bg-orchard-50/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="font-display text-3xl md:text-4xl font-bold text-orchard-800 text-center mb-4">
          {title}
        </h2>
        {subtitle && (
          <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">{subtitle}</p>
        )}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {items.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
