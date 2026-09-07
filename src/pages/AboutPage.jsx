import WhyChooseUs from '../components/WhyChooseUs';
import Features from '../components/Features';
import Contact from '../components/Contact';

export default function AboutPage() {
  return (
    <>
      <section className="relative py-24 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1560807707-8cc77767d783?w=1920&q=80')`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-orchard-50/90 to-white" />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-display text-4xl md:text-5xl font-bold text-orchard-800 mb-6">
            About Apple Farm
          </h1>
          <p className="text-lg text-gray-700 leading-relaxed mb-4">
            Nestled in the foothills of the Himalayas, Apple Farm has been growing premium apples for over two decades.
            Our family-run orchards in Himachal Pradesh benefit from the region's unique climate—cold winters, mild summers,
            and pure mountain air—which gives our apples their signature crisp texture and sweet flavor.
          </p>
          <p className="text-lg text-gray-700 leading-relaxed">
            We believe in bringing farm-fresh produce directly to your table. No long supply chains, no cold storage for months.
            Just freshly harvested apples, packed with care and delivered to your doorstep.
          </p>
        </div>
      </section>
      <WhyChooseUs />
      <Features />
      <Contact />
    </>
  );
}
