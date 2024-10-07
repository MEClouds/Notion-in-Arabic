"use client"
import Spinner from "@/components/spinner"
import { Button } from "@/components/ui/button"
import { SignInButton } from "@clerk/nextjs"
import { useConvexAuth } from "convex/react"
import { ArrowRight, LogInIcon } from "lucide-react"
import { useTranslations } from "next-intl"
import Link from "next/link"
import React from "react"

// Heading component represents the main heading section of the LandingPage
const Heading = () => {
  // Custom hook to use translations for internationalization
  const t = useTranslations("Index")
  const { isAuthenticated, isLoading } = useConvexAuth()
  return (
    // Container with maximum width and vertical spacing
    <div className="max-w-3xl space-y-4">
      {/* Main heading with different font sizes and styles */}
      <h1
        className="
          font-bold text-3xl sm:text-5xl md:text-5xl
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
      {isLoading && (
        <div className="w-full flex items-center justify-center ">
          <Spinner size="lg" />
        </div>
      )}
      {isAuthenticated && !isLoading && (
        <Button>
          <Link href="/documents">
            <LogInIcon className="h-4 w-4 mx-2" />
          </Link>
          {t("enter")}
        </Button>
      )}
      {!isAuthenticated && !isLoading && (
        <SignInButton mode="modal">
          <Button className="bg-[#0582FF] hover:bg-[#045AC3] text-white transition-all rounded-md">
            <ArrowRight className="h-4 w-4 mx-2" />
            {t("GetNotionsFree")}
          </Button>
        </SignInButton>
      )}
    </div>
  )
}

export default Heading
