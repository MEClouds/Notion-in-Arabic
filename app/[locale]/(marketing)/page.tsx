import React from "react";
import Heading from "./_components/heading";
import Heroes from "./_components/heroes";
import Footer from "./_components/footer";

// LandingPage component represents the main page of the application
const LandingPage = () => {
  return (
    // The main container div with flex layout and vertical column direction
    <div className="min-h-full flex flex-col  dark:bg-[#1F1F1F]">
      {/* Inner container for content alignment */}
      <div
        className="
          flex flex-col items-center justify-center md:justify-start text-center
          gap-y-3 flex-1 px-6 pb-10"
        dir="rtl"
      >
        {/* Heading component for the title of the page */}
        <Heading />

        {/* Heroes component for displaying hero content */}
        <Heroes />
      </div>

      {/* Footer component for the page footer */}
      <Footer />
    </div>
  );
};

export default LandingPage;
