import { useState } from 'react';
import { Navbar } from './components/layout/Navbar';
import { Hero } from './components/sections/Hero';
import { Ticker } from './components/sections/Ticker';
import { SocialProof } from './components/sections/SocialProof';
import { Manifesto } from './components/sections/Manifesto';
import { Pillars } from './components/sections/Pillars';
import { CommunityVoices } from './components/sections/CommunityVoices';
import { Roadmap } from './components/sections/Roadmap';
import { EarlyAccess } from './components/sections/EarlyAccess';
import { HowToBuy } from './components/sections/HowToBuy';
import { FAQ } from './components/sections/FAQ';
import { CTA } from './components/sections/CTA';
import { Footer } from './components/sections/Footer';
import { Cursor } from './components/shared/Cursor';
import { QRModal } from './components/shared/QRModal';
import { Preloader } from './components/shared/Preloader';
import { CONTENT } from './config/content';
import { trackQROpen } from './services/analytics';

function App() {
  const [isQRModalOpen, setIsQRModalOpen] = useState(false);

  return (
    <main className="relative selection:bg-amber selection:text-ink bg-ink min-h-screen">
      <Preloader />
      <Cursor />
      
      <Navbar onOpenQR={() => {
        trackQROpen('navbar');
        setIsQRModalOpen(true);
      }} />
      
      <Hero />
      <Ticker />
      <SocialProof />
      <Manifesto />
      <Pillars />
      <CommunityVoices />
      <Roadmap />
      <EarlyAccess />
      <HowToBuy />
      <FAQ />
      <CTA />
      <Footer />

      <QRModal 
        isOpen={isQRModalOpen} 
        onClose={() => setIsQRModalOpen(false)} 
        url={CONTENT.nav.ctaHref}
      />
    </main>
  );
}

export default App;
