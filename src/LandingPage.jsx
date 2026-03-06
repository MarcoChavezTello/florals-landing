import './landing.css'

import Navbar from './components/Navbar'
import Footer from './components/Footer'

import Hero from './sections/Hero'
import Products from './sections/Products'
import Benefits from './sections/Benefits'
import Testimonials from './sections/Testimonials'
import Promotion from './sections/Promotion'
import FinalCTA from './sections/FinalCTA'

export default function LandingPage() {
  return (
    <div className="landing-root">
      <Navbar />
      <Hero />
      <Products />
      <Benefits />
      <Testimonials />
      <Promotion />
      <FinalCTA />
      <Footer />
    </div>
  );
}