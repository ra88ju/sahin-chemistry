import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Courses from './components/Courses';
import Teachers from './components/Teachers';
import Admission from './components/Admission';
import Gallery from './components/Gallery';
import Contact from './components/Contact';
import Footer from './components/Footer';

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <Hero />
      <About />
      <Courses />
      <Teachers />
      <Admission />
      <Gallery />
      <Contact />
      <Footer />
    </main>
  );
}