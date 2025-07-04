import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Nasa from "./components/Nasa";
import WhatsAppButton from "./components/WhatsAppButton";

function App() {
  return (
    <div className="bg-gray-900 text-white">
      <Header />
      <main>
        <Hero />
        <Nasa />
        <Projects />
        <Skills />
        <About />
        <Contact />
        <WhatsAppButton />
      </main>
    </div>
  );
}

export default App;
