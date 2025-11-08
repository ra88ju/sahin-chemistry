export default function Hero() {
  return (
    <section id="home" className="pt-40 pb-40 bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 text-white">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 animate-fade-in">
            Welcome to Sahin Chemistry Center
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-blue-100">
            Excellence in Chemical Education - Building Future Chemists
          </p>
          <a
            href="#admission"
            className="inline-block bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-blue-50 transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            Apply Now
          </a>
        </div>
      </div>
    </section>
  );
}

