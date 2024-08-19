import useTextDirection from "@/hooks/useTextDirection"
import { ClerkProvider } from "@clerk/nextjs"
import "../globals.css"
import { NextIntlClientProvider, useLocale, useMessages } from "next-intl"
import { Inter } from "next/font/google"
import { notFound } from "next/navigation"
import { ReactNode } from "react"
import { Metadata } from "next"
import { ThemeProvider } from "@/components/providers/ThemeProvider"
import ConvexProvider from "@/components/providers/convex-provider"
import { Toaster } from "sonner"
// Can be imported from a shared config
const locales: string[] = ["en", "ar", "es"]
const inter = Inter({ subsets: ["latin"] })
type Props = {
  children: ReactNode
  params: { locale: string }
}

export const metadata: Metadata = {
  title: " Notions",
  description:
    "Notion app for Capture your thoughts, organize your projects, and effortlessly share your ideas.",
  // icons:{
  //   icon:[
  //     {
  //       media :"(prefers-color-scheme:light)",
  //       url:"/logo.svg",
  //       href:"/logo.svg",
  //     },
  //     {
  //       media :"(prefers-color-scheme:light)",
  //       url:"/logo-dark.svg",
  //       href:"/logo-dark.svg",
  //     },
  //   ]
  // }
}
export default function LocaleLayout({ children }: Props) {
  const locale = useLocale()
  const direction = useTextDirection(locale)
  // Validate that the incoming `locale` parameter is valid
  if (!locales.includes(locale)) notFound()
  const messages = useMessages()

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <html lang={locale} dir={direction} suppressHydrationWarning>
        <body className={inter.className}>
          <ConvexProvider locale={locale}>
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
              storageKey="notions-theme"
            >
              <Toaster position="top-center" />
              {children}
            </ThemeProvider>
          </ConvexProvider>
        </body>
      </html>
    </NextIntlClientProvider>
  )
}
//install sonner
