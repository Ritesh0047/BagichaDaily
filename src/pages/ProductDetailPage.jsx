import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { products } from '../data/products';
import { useCart } from '../context/CartContext';

const WEIGHT_OPTIONS = [
  { value: '1kg', label: '1 kg', priceMult: 1 },
  { value: '5kg', label: '5 kg', priceMult: 4.5 },
  { value: '10kg', label: '10 kg', priceMult: 8.5 },
];

function buildWhatsAppMessage(product, quantity, weight) {
  const prices = { '1kg': product.price, '5kg': Math.round(product.price * 4.5), '10kg': Math.round(product.price * 8.5) };
  const total = (prices[weight] || product.price) * quantity;
  return `Hi! I'd like to order:
*${product.name}* (${product.variety})
- Weight: ${weight}
- Quantity: ${quantity} pack(s)
- Total: ₹${total}

Please confirm availability.`;
}

export default function ProductDetailPage() {
  const { id } = useParams();
  const [quantity, setQuantity] = useState(1);
  const [weight, setWeight] = useState('1kg');
  const { addToCart, getWeightPrice } = useCart();

  const product = products.find((p) => p.id === parseInt(id, 10));

  if (!product) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center px-4">
        <h1 className="font-display text-2xl font-bold text-orchard-800 mb-4">Product not found</h1>
        <Link to="/products" className="text-orchard-600 hover:text-orchard-700 font-medium">
          ← Back to Products
        </Link>
      </div>
    );
  }

  const priceForWeight = getWeightPrice(product.price, weight);

  const handleWhatsApp = () => {
    const message = encodeURIComponent(buildWhatsAppMessage(product, quantity, weight));
    window.open(`https://wa.me/919876543210?text=${message}`, '_blank');
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
      <Link
        to="/products"
        className="inline-flex items-center gap-2 text-orchard-600 hover:text-orchard-700 font-medium mb-8"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        Back to Products
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        <div className="aspect-square rounded-2xl overflow-hidden bg-orchard-50 shadow-lg">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover"
          />
        </div>

        <div>
          <span className="text-sm font-medium text-orchard-600 uppercase tracking-wider">
            {product.variety}
          </span>
          <h1 className="font-display text-3xl md:text-4xl font-bold text-orchard-800 mt-2">
            {product.name}
          </h1>
          <p className="text-gray-600 mt-4 leading-relaxed">{product.description}</p>

          <div className="mt-8">
            <p className="text-sm font-medium text-gray-700 mb-3">Select weight</p>
            <div className="flex gap-3">
              {WEIGHT_OPTIONS.map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => setWeight(opt.value)}
                  className={`px-6 py-3 rounded-xl font-medium transition-colors ${
                    weight === opt.value
                      ? 'bg-orchard-600 text-white'
                      : 'bg-orchard-100 text-orchard-800 hover:bg-orchard-200'
                  }`}
                >
                  {opt.label} — ₹{Math.round(product.price * opt.priceMult)}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-8 flex items-center gap-6">
            <div className="flex items-center border border-orchard-200 rounded-xl overflow-hidden">
              <button
                type="button"
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="px-4 py-3 text-orchard-600 hover:bg-orchard-50 font-medium"
              >
                −
              </button>
              <span className="px-6 py-3 min-w-[3rem] text-center font-medium">{quantity}</span>
              <button
                type="button"
                onClick={() => setQuantity((q) => q + 1)}
                className="px-4 py-3 text-orchard-600 hover:bg-orchard-50 font-medium"
              >
                +
              </button>
            </div>
            <p className="text-2xl font-bold text-orchard-800">
              ₹{priceForWeight * quantity} total
            </p>
          </div>

          <div className="mt-8 flex flex-col sm:flex-row gap-4">
            <button
              onClick={() => addToCart(product, quantity, weight)}
              className="flex-1 px-6 py-4 bg-orchard-600 text-white font-semibold rounded-xl hover:bg-orchard-700 transition-colors"
            >
              Add to Cart
            </button>
            <button
              onClick={handleWhatsApp}
              className="flex-1 px-6 py-4 bg-green-600 text-white font-semibold rounded-xl hover:bg-green-700 transition-colors flex items-center justify-center gap-2"
            >
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              Order via WhatsApp
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
