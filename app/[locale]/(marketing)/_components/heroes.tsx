import Image from "next/image"
import React from "react"

// Heroes component displays hero images representing different sections
const Heroes = () => {
  return (
    // Main container with flex layout and centered content
    <div
      className="flex flex-col items-center justify-center max-w-5xl"
      dir="rtl"
    >
      {/* Container for the two hero images, aligned horizontally */}
      <div className="flex items-center gap-4">
        {/* Hero image for reading section with responsive size classes */}
        <div
          className="relative w-[300px] h-[300px] sm:w-[350px] sm:h-[350px]
           md:h-[400px] md:w-[400px]"
        >
          {/* Image component with source, fill, and object-contain styling */}
          <Image
            src="/laptop.svg"
            fill
            className="object-contain dark:hidden"
            alt="laptop"
          />

          <Image
            src="/laptop-dark.svg"
            fill
            className="object-contain hidden dark:block"
            alt="laptop"
          />
        </div>
        {/* Hero image for documents section with responsive size classes, visible only on medium screens and above */}
        <div className="relative h-[400px] w-[400px] hidden md:block">
          {/* Image component with source, fill, and object-contain styling */}
          <Image
            src="/reading.svg"
            fill
            className="object-contain dark:hidden"
            alt={"Documents"}
          />
          <Image
            src="/reading-dark.svg"
            fill
            className="object-contain hidden dark:block"
            alt={"Documents"}
          />
        </div>
      </div>
    </div>
  )
}

export default Heroes
