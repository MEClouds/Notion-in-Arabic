"use client";
import { useScrollTop } from "@/hooks/use-scroll-top";
import { cn } from "@/lib/utils";
import React, { useState } from "react";
import Logo from "./logo";
import { useTranslations } from "next-intl";
import { ModeToggle } from "@/components/mode-toggle";
import { useConvexAuth } from "convex/react";
import { SignInButton, UserButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import Spinner from "@/components/spinner";
import Link from "next/link";

// Component definition for Navbar
const Navbar = () => {
  const { isAuthenticated, isLoading } = useConvexAuth();
  // Custom hook to check if scrolled or not
  const scrolled = useScrollTop();

  // Internationalization hook to get translations
  const t = useTranslations("Index");

  return (
    // Navbar container with dynamic class names using Tailwind CSS utility functions
    <div
      className={cn(
        // Base styles for the Navbar
        "z-50 bg-background dark:bg-[#1F1F1F] fixed top-0 flex items-center w-full p-6",
        // Conditional styles based on scroll position
        scrolled && "border-b shadow-md dark:shadow-gray-700"
      )}
    >
      {/* Logo component */}
      <Logo />

      <div
        className="
      md:mx-auto md:justify-end justify-between
       w-full flex items-center gap-x-2"
      >
        {/* {t("sign-in")} */}
        {isLoading && <Spinner />}
        {!isAuthenticated && !isLoading && (
          <>
            <SignInButton mode="modal">
              <Button variant={"ghost"} size={"sm"}>
                {t("sign-in")}
              </Button>
            </SignInButton>
            <SignInButton mode="modal">
              <Button size={"sm"}>Notions</Button>
            </SignInButton>
          </>
        )}
        {isAuthenticated && !isLoading && (
          <>
            <Button variant={"ghost"} size={"sm"} asChild>
              <Link href="/documents">{t("enter")}</Link>
            </Button>
            <UserButton afterSignOutUrl="/" />
          </>
        )}

        {/* ModeToggle component for toggling light/dark mode */}
        <ModeToggle />
      </div>
    </div>
  );
};

export default Navbar;

// z-50:
// This sets the z-index of the element to 50. It's often used to control the stacking order of elements.
// bg-background dark:bg-[#1F1F1F]:

// Sets the background color to a light background color (bg-background) and sets the dark mode background color to a specific dark color (dark:bg-[#1F1F1F]).
// fixed top-0:

// Makes the element fixed to the top of the viewport, ensuring it stays at the top even when the user scrolls.
// flex items-center w-full p-6:

// Configures the element to be a flex container with its items centered horizontally and vertically. It takes the full width of its parent and has padding of 6 units on all sides.
// scrolled && "border-b shadow-md dark:shadow-gray-700":

// This is a conditional class. If the scrolled variable is truthy (i.e., if the user has scrolled), it adds a bottom border and a shadow to the Navbar. In dark mode, it applies a different shadow.
// md:mx-auto md:justify-end justify-between:

// These classes handle the layout at medium screen sizes and above. It centers the content horizontally (mx-auto) and adjusts the justification between items for different screen sizes.
// w-full flex items-center gap-x-2:

// Configures the child container to take the full width of its parent, be a flex container with items centered horizontally, and have a horizontal gap of 2 units between its child elements.
// dark:shadow-gray-700:

// Applies a specific shadow color in dark mode.
