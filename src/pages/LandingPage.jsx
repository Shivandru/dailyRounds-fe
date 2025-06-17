import Banner from "../sections/Banner";
import Features from "../sections/Features";
import Footer from "../sections/Footer";
import Hero from "../sections/Hero";
import Navbar from "../sections/Navbar";

export function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-pink-600 to-blue-600">
      <Navbar />
      <Hero />
      <Features />
      <Banner />
      <Footer />
    </div>
  );
}
