import Contact from '../components/Contact';

export default function ContactPage() {
  return (
    <>
      <section className="py-16 bg-gradient-to-b from-orchard-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-display text-4xl md:text-5xl font-bold text-orchard-800 mb-4">
            Contact Us
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Have a question or want to place an order? Reach out—we're happy to help.
          </p>
        </div>
      </section>
      <Contact />
    </>
  );
}
