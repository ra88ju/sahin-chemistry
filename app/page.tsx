import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Courses from './components/Courses';
import Teachers from './components/Teachers';
import Admission from './components/Admission';
import Gallery from './components/Gallery';
import PDFs from './components/PDFs';
import Contact from './components/Contact';
import Footer from './components/Footer';

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <Hero />
      <Courses />
      <Teachers />
      <PDFs />
      <Admission />
      <Gallery />
      <About />
      <Contact />
      <Footer />
    </main>
  );
}