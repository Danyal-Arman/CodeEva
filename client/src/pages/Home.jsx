import HeroSection from "../components/HeroSection";
import React from "react";
import Features from "../components/Features/Features";
import ProblemSection from "../components/ProblemSection";
import UsecaseSection from "../components/UsecaseSection";
import CTASection from "../components/CTASection";
import Footer from "../components/Footer";

const Home = () => {
  return (
    <div>
      <HeroSection />
      <ProblemSection />
      <Features />
      <UsecaseSection />
      <CTASection />
      <Footer />
    </div>
  );
};

export default Home;
