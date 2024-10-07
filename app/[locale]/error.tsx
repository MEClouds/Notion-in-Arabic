"use client"

import { Button } from "@/components/ui/button"
import { useTranslations } from "next-intl"
import Image from "next/image"
import Link from "next/link"

const Error = () => {
  const t = useTranslations("Index")
  return (
    <div
      className="h-full flex flex-col items-center justify-center
    space-y-4
   "
    >
      <Image
        src="/error.svg"
        height={300}
        width={300}
        alt="error"
        className="dark:hidden"
      />
      <Image
        src="/error-dark.svg"
        height={300}
        width={300}
        alt="error"
        className="hidden dark:block"
      />

      <h2 className="text-xl font-medium">{t("error")}</h2>
      <Button asChild>
        <Link href={"/documents"}>{t("back")}</Link>
      </Button>
    </div>
  )
}

export default Error
