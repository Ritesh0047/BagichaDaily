import Hero from '../components/Hero';
import Features from '../components/Features';
import Products from '../components/Products';
import WhyChooseUs from '../components/WhyChooseUs';
import Contact from '../components/Contact';

export default function HomePage() {
  return (
    <>
      <Hero />
      <Features />
      <Products
        title="Our Apple Collection"
        subtitle="Hand-picked varieties from the finest Himalayan orchards. Fresh, crisp, and naturally sweet."
        limit={6}
      />
      <WhyChooseUs />
      <Contact />
    </>
  );
}
