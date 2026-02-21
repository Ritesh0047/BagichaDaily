const reasons = [
  {
    title: 'Direct from Farmers',
    description: 'We work directly with local Himachali farmers. Every rupee supports their families and communities.',
  },
  {
    title: 'Natural Produce',
    description: 'Our apples are grown in nutrient-rich Himalayan soil with minimal intervention. What nature intended.',
  },
  {
    title: 'Himachal Apples',
    description: 'The unique climate of Himachal Pradesh produces apples known for their crisp texture and sweet flavor.',
  },
  {
    title: 'Quality Assurance',
    description: 'Every batch is hand-inspected. We only deliver apples that meet our high standards.',
  },
];

export default function WhyChooseUs() {
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="font-display text-3xl md:text-4xl font-bold text-orchard-800 text-center mb-4">
          Why Choose Us
        </h2>
        <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
          We're not just selling apples. We're bringing the taste of the Himalayas to your home.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {reasons.map((reason, i) => (
            <div
              key={i}
              className="relative p-6 rounded-2xl bg-gradient-to-br from-orchard-50 to-white border border-orchard-100 hover:shadow-md transition-shadow"
            >
              <span className="inline-block w-10 h-10 rounded-full bg-orchard-200/50 text-orchard-700 font-bold flex items-center justify-center mb-4">
                {i + 1}
              </span>
              <h3 className="font-semibold text-lg text-orchard-800 mb-2">{reason.title}</h3>
              <p className="text-gray-600 text-sm">{reason.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
