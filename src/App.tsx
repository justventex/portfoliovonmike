import React, { useState } from 'react';
import { Loader } from './components/Loader';
import { Hero } from './components/Hero';
import { Navbar } from './components/Navbar';
import { AboutSection } from './components/AboutSection';
import { WorkSection } from './components/WorkSection';
import { ContactSection } from './components/ContactSection';

function App() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <>
      {isLoading && <Loader onComplete={() => setIsLoading(false)} />}

      <main>
        <Navbar />
        <Hero />
        <AboutSection />
        <WorkSection />
        <ContactSection />
      </main>
    </>
  );
}

export default App;
