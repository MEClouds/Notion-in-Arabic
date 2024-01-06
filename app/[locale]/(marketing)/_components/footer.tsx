import React from "react";
import Logo from "./logo";
import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";

// Footer component definition
const Footer = () => {
  // Internationalization hook to get translations
  const t = useTranslations("Index");

  return (
    // Container for the Footer with Tailwind CSS styles
    <div className="flex items-center w-full p-5 z-40 ">
      {/* Logo component */}
      <Logo />

      {/* Container for additional content and buttons */}
      <div className="md:ml-auto w-full justify-between md:justify-end flex items-center gap-x-2 text-muted-foreground">
        {/* Ghost variant Button for Privacy */}
        <Button variant={"ghost"} size={"sm"}>
          {t("privacy")}
        </Button>

        {/* Ghost variant Button for Terms */}
        <Button variant={"ghost"} size={"sm"}>
          {t("terms")}
        </Button>
      </div>
    </div>
  );
};

export default Footer;

// Explanation of Tailwind CSS classes:

// flex items-center w-full p-5 z-40:
// This sets the container to be a flex container with items centered horizontally and vertically.
// It takes the full width of its parent, has padding of 5 units on all sides, and has a z-index of 40.

// md:ml-auto w-full justify-between md:justify-end flex items-center gap-x-2 text-muted-foreground:
// These classes handle the layout at medium-sized screens and above. It adjusts the left margin to auto,
//  takes the full width, justifies the content between and at the end, sets the container as a flex container with items centered horizontally and vertically, adds a horizontal gap of 2 units between items, and applies a text color for muted foreground.

// variant={"ghost"} size={"sm"}:
// These are likely custom props passed to the Button component. They specify the visual style and size of the button.
//  The "ghost" variant usually implies a transparent or minimal style, and "sm" denotes a small size.
