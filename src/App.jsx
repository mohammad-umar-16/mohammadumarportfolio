import Navbar from './components/Navbar';
import Hero from './sections/Hero';
import About from './sections/About';
import FeaturedWork from './sections/FeaturedWork';
import GitHubProjects from './sections/GitHubProjects';
import Publications from './sections/Publications';
import { Certifications, Education, Achievements, Experience, Skills, Contact } from './sections/Misc';
import CommandDivider from './components/CommandDivider';

export default function App() {
  return (
    <main className="relative">
      <Navbar />
      <Hero />
      <About />
      <CommandDivider />
      <FeaturedWork />
      <CommandDivider />
      <GitHubProjects />
      <CommandDivider />
      <Publications />
      <Certifications />
      <CommandDivider />
      <Education />
      <Achievements />
      <CommandDivider />
      <Experience />
      <CommandDivider />
      <Skills />
      <Contact />
    </main>
  );
}