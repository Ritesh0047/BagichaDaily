import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const PHONE = '919876543210';

function buildWhatsAppMessage(cart, cartTotal, getWeightPrice) {
  const lines = cart.map(
    (item) => `• ${item.name} (${item.weight}) x${item.quantity} - ₹${getWeightPrice(item.price, item.weight) * item.quantity}`
  );
  return `Hi! I'd like to place an order:

${lines.join('\n')}

*Total: ₹${cartTotal}*

Please confirm and let me know delivery details.`;
}

export default function CartPage() {
  const { cart, cartTotal, removeFromCart, updateQuantity, getWeightPrice, clearCart } = useCart();

  const handleWhatsApp = () => {
    const total = cart.reduce(
      (sum, item) => sum + getWeightPrice(item.price, item.weight) * item.quantity,
      0
    );
    const message = encodeURIComponent(buildWhatsAppMessage(cart, total, getWeightPrice));
    window.open(`https://wa.me/${PHONE}?text=${message}`, '_blank');
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center px-4">
        <div className="text-6xl mb-4">🛒</div>
        <h1 className="font-display text-2xl font-bold text-orchard-800 mb-4">Your cart is empty</h1>
        <p className="text-gray-600 mb-8">Add some fresh apples to get started!</p>
        <Link
          to="/products"
          className="px-8 py-3 bg-orchard-600 text-white font-semibold rounded-xl hover:bg-orchard-700 transition-colors"
        >
          Shop Products
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
      <h1 className="font-display text-3xl md:text-4xl font-bold text-orchard-800 mb-8">
        Your Cart
      </h1>

      <div className="space-y-4 mb-12">
        {cart.map((item) => {
          const price = getWeightPrice(item.price, item.weight);
          const subtotal = price * item.quantity;
          return (
            <div
              key={`${item.id}-${item.weight}`}
              className="flex flex-col sm:flex-row gap-4 p-4 rounded-2xl bg-white border border-orchard-100 shadow-sm"
            >
              <div className="flex gap-4 sm:flex-1">
                <div className="w-24 h-24 rounded-xl overflow-hidden bg-orchard-50 flex-shrink-0">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-orchard-800">{item.name}</h3>
                  <p className="text-sm text-gray-500">{item.variety} • {item.weight}</p>
                  <p className="text-orchard-600 font-medium">₹{price} per pack</p>
                </div>
              </div>
              <div className="flex items-center justify-between sm:justify-end gap-4 sm:w-auto">
                <div className="flex items-center border border-orchard-200 rounded-lg overflow-hidden">
                  <button
                    type="button"
                    onClick={() => updateQuantity(item.id, item.weight, item.quantity - 1)}
                    className="px-3 py-2 text-orchard-600 hover:bg-orchard-50"
                  >
                    −
                  </button>
                  <span className="px-4 py-2 min-w-[2rem] text-center font-medium">{item.quantity}</span>
                  <button
                    type="button"
                    onClick={() => updateQuantity(item.id, item.weight, item.quantity + 1)}
                    className="px-3 py-2 text-orchard-600 hover:bg-orchard-50"
                  >
                    +
                  </button>
                </div>
                <p className="font-bold text-orchard-800">₹{subtotal}</p>
                <button
                  type="button"
                  onClick={() => removeFromCart(item.id, item.weight)}
                  className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  aria-label="Remove"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>
            </div>
          );
        })}
      </div>

      <div className="rounded-2xl bg-orchard-50 border border-orchard-100 p-6 mb-8">
        <div className="flex justify-between items-center mb-4">
          <span className="text-lg font-medium text-gray-700">Total</span>
          <span className="text-2xl font-bold text-orchard-800">₹{cartTotal}</span>
        </div>
        <p className="text-sm text-gray-600 mb-6">
          Orders are placed via WhatsApp. Click below to complete your order.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <button
            onClick={handleWhatsApp}
            className="flex-1 px-6 py-4 bg-green-600 text-white font-semibold rounded-xl hover:bg-green-700 transition-colors flex items-center justify-center gap-2"
          >
            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            Order via WhatsApp
          </button>
          <button
            onClick={clearCart}
            className="px-6 py-4 border border-orchard-300 text-orchard-700 font-medium rounded-xl hover:bg-orchard-50 transition-colors"
          >
            Clear Cart
          </button>
          <Link
            to="/products"
            className="px-6 py-4 border border-orchard-300 text-orchard-700 font-medium rounded-xl hover:bg-orchard-50 transition-colors text-center"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
}
