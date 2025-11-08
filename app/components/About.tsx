export default function About() {
  return (
    <section id="about" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">About Us</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-2xl font-semibold mb-4 text-blue-600">Our Mission</h3>
              <p className="text-gray-700 leading-relaxed">
                To provide exceptional chemistry education that empowers students to excel in their
                academic and professional pursuits. We are committed to fostering a deep understanding
                of chemical principles through innovative teaching methods and hands-on learning.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-2xl font-semibold mb-4 text-blue-600">Our Purpose</h3>
              <p className="text-gray-700 leading-relaxed">
                Sahin Chemistry Center was established to bridge the gap between theoretical knowledge
                and practical application. We strive to create an environment where students can explore,
                experiment, and excel in the fascinating world of chemistry.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

