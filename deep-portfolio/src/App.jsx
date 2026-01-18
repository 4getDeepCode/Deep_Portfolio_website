import CustomCursor from "./component/CustomCursor";
import Navbar from "./component/Navbar";
import ParticleBackground from "./component/ParticlesBackground";
import About from "./sections/About";
import Contact from "./sections/Contact";
import Experience from "./sections/Experience";
import Footer from "./sections/Footer";
import Home from "./sections/Home";
import Projects from "./sections/Projects";
import Skills from "./sections/Skills";
import Testimonials from "./sections/Testimonials";

function App() {
  return (
    <div className="relative animated-gradient text-white ">
      <CustomCursor />
      <ParticleBackground />
      <Navbar />
      <Home />
      <About />
      <Skills />
      <Projects />
      <Experience />
      <Testimonials />
      <Contact />
      <Footer />
    </div>
  );
}

export default App;
