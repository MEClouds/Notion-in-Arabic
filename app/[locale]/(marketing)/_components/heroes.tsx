import Image from "next/image";
import React from "react";

// Heroes component displays hero images representing different sections
const Heroes = () => {
  return (
    // Main container with flex layout and centered content
    <div className="flex flex-col items-center justify-center max-w-5xl">
      {/* Container for the two hero images, aligned horizontally */}
      <div className="flex items-center">
        {/* Hero image for reading section with responsive size classes */}
        <div
          className="relative w-[300px] h-[300px] sm:w-[350px] sm:h-[350px]
           md:h-[400px] md:w-[400px]"
        >
          {/* Image component with source, fill, and object-contain styling */}
          <Image
            src="/reading.png"
            fill
            className="object-contain"
            alt="reading"
          />
        </div>

        {/* Hero image for documents section with responsive size classes, visible only on medium screens and above */}
        <div className="relative h-[400px] w-[400px] hidden md:block">
          {/* Image component with source, fill, and object-contain styling */}
          <Image
            src="/documents.png"
            fill
            className="object-contain"
            alt={"Documents"}
          />
        </div>
      </div>
    </div>
  );
};

export default Heroes;
