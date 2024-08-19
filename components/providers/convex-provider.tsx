"use client"
import { arSA, enUS } from "@clerk/localizations"
import { ClerkProvider, useAuth } from "@clerk/nextjs"
import { ConvexReactClient } from "convex/react"
import { ConvexProviderWithClerk } from "convex/react-clerk"
import React, { ReactNode } from "react"

const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL!)
const ConvexProvider = ({
  locale,
  children,
}: {
  locale: string
  children: ReactNode
}) => {
  const normalizedLocale = locale == "ar" ? arSA : enUS
  return (
    <ClerkProvider
      localization={normalizedLocale}
      publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}
    >
      <ConvexProviderWithClerk useAuth={useAuth} client={convex}>
        {children}
      </ConvexProviderWithClerk>
    </ClerkProvider>
  )
}

export default ConvexProvider
