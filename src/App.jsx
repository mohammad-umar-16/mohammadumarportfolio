import Navbar from './components/Navbar';
import Hero from './sections/Hero';
import About from './sections/About';
import FeaturedWork from './sections/FeaturedWork';
import GitHubProjects from './sections/GitHubProjects';
import Publications from './sections/Publications';
import { Certifications, Education, Achievements, Experience, Skills, Contact } from './sections/Misc';
import CommandDivider from './components/CommandDivider';
import ScrollProgress from './components/ScrollProgress';
import CustomCursor from './components/CustomCursor';
import ParallaxGrid from './components/ParallaxGrid';
import BootSequence from './components/BootSequence';
import CommandPalette from './components/CommandPalette';
import ResumePreview from './components/ResumePreview';

export default function App() {
  return (
    <>
      <BootSequence />
      <div className="grain-overlay" aria-hidden="true" />
      <ScrollProgress />
      <CustomCursor />
      <ParallaxGrid />
      <CommandPalette />
      <ResumePreview />
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
    </>
  );
}