import ScrollToTopButton from './components/ScrollToTopButton';
import Navbar from './components/Navbar.jsx';
import Hero from './components/Hero.jsx';
import About from './components/About';
import WorkHistory from './components/WorkHistory';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Footer from './components/Footer';

function App() {
  return (
    <>
      <Navbar />
      <Hero />
      <About />
      <WorkHistory />
      <Projects />
      <Contact />
      <Footer />
      <ScrollToTopButton />
    </>
  );
}

export default App;
