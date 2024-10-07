import React from "react"
import { Poppins } from "next/font/google"
import Image from "next/image"
import { cn } from "@/lib/utils"

// Define the Poppins font with specific subsets and weights
const font = Poppins({
  subsets: ["latin"],
  weight: ["400", "600"],
})

// Logo component definition
const Logo = () => {
  return (
    // Container for the logo and text, visible on medium-sized screens and above
    <div className="hidden md:flex items-center gap-x-2">
      {/* Next.js Image component for the logo */}
      <Image
        className="dark:hidden"
        src="/logo.svg"
        height={"40"}
        width={"40"}
        alt="logo"
      />
      <Image
        className="hidden dark:block"
        src="/logo-dark.svg"
        height={"40"}
        width={"40"}
        alt="logo"
      />

      {/* Text component with Tailwind CSS classes */}
      <p className={cn("font-semibold", font.className)}>Notions</p>
    </div>
  )
}

export default Logo

// Explanation of Tailwind CSS classes:

// hidden md:flex items-center gap-x-2:

// This class combination hides the element by default and makes it visible only
//  on medium-sized screens (md). It sets the element to be a flex container with
//  its items centered horizontally and has a horizontal gap of 2 units between items.

// font-semibold:
// This class sets the font weight to semi-bold. It is a predefined class in Tailwind CSS.

// font.className:
// This dynamically applies the generated class names for the specified font (Poppins in this case)
//  with the specified subsets and weights. It allows you to use the font styles defined in the font variable.
