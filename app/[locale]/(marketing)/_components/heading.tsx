import { Button } from "@/components/ui/button";
import { LogInIcon } from "lucide-react";
import { useTranslations } from "next-intl";
import React from "react";

// Heading component represents the main heading section of the LandingPage
const Heading = () => {
  // Custom hook to use translations for internationalization
  const t = useTranslations("Index");

  return (
    // Container with maximum width and vertical spacing
    <div className="max-w-3xl space-y-4">
      {/* Main heading with different font sizes and styles */}
      <h1
        className="
          font-bold text-3xl sm:text-5xl md:text-6xl
        "
      >
        {/* Dynamic heading content with translation and underlined span */}
        {t("heading")} <span className="underline">Notions</span>
      </h1>

      {/* Subheading with varying text sizes and font weight */}
      <h3 className="text-base sm:text-xl md:text-2xl font-medium">
        {t("subHeading")}
      </h3>

      {/* Button component for user interaction */}
      <Button>
        {/* LogInIcon with customized size and margin */}
        <LogInIcon className="h-4 w-4 mx-2" />
        {/* Dynamic button text with translation */}
        {t("enter")}
      </Button>
    </div>
  );
};

export default Heading;
