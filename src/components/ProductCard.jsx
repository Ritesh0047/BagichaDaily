import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

export default function ProductCard({ product }) {
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();

  const handleAddToCart = (e) => {
    e.preventDefault();
    addToCart(product, quantity, '1kg');
  };

  return (
    <Link
      to={`/products/${product.id}`}
      className="group block bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 border border-orchard-100 hover:border-orchard-200"
    >
      <div className="aspect-square overflow-hidden bg-orchard-50">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
      </div>
      <div className="p-5">
        <span className="text-xs font-medium text-orchard-600 uppercase tracking-wider">
          {product.variety}
        </span>
        <h3 className="font-display text-xl font-semibold text-orchard-800 mt-1 group-hover:text-orchard-600">
          {product.name}
        </h3>
        <p className="text-sm text-gray-600 mt-2 line-clamp-2">{product.description}</p>
        <div className="mt-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <span className="text-lg font-bold text-orchard-700">₹{product.price}/kg</span>
          <div className="flex items-center gap-2" onClick={(e) => e.preventDefault()}>
            <div className="flex items-center border border-orchard-200 rounded-lg overflow-hidden flex-shrink-0">
              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  setQuantity((q) => Math.max(1, q - 1));
                }}
                className="px-2 py-1 text-orchard-600 hover:bg-orchard-50"
              >
                −
              </button>
              <span className="px-3 py-1 text-sm font-medium min-w-[2rem] text-center">
                {quantity}
              </span>
              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  setQuantity((q) => q + 1);
                }}
                className="px-2 py-1 text-orchard-600 hover:bg-orchard-50"
              >
                +
              </button>
            </div>
            <button
              onClick={handleAddToCart}
              className="flex-1 px-4 py-2 bg-orchard-600 text-white text-sm font-medium rounded-lg hover:bg-orchard-700 transition-colors whitespace-nowrap"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
}
