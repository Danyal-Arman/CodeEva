import Hero from "../components/Landing/Hero";
import React from "react";
import Footer from "../components/Footer";
import Marquee from "../components/Landing/Marquee";
import Showcase from "../components/Landing/Showcase";
import HowItWorks from "../components/Landing/HowItWorks";
import BentoFeatures from "../components/Landing/BentoFeatures";
import Comparison from "../components/Landing/Comparision";
import AiShowcase from "../components/Landing/AIShowcase";
import CollabDemo from "../components/Landing/CollabDemo";
import FunalCta from "../components/Landing/FinalCta";

const Home = () => {
  return (
    <div>
      <Hero />
      <Marquee />
      <Showcase />
      <HowItWorks />
      <BentoFeatures />
      <Comparison />
      <AiShowcase />
      <CollabDemo />
      <FunalCta />
      <Footer />
    </div>
  );
};

export default Home;
