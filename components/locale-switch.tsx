import { Languages } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu"

import Link from "next/link"
import { Button } from "./ui/button"
import { useLocale } from "next-intl"
import { usePathname, useRouter } from "next/navigation"
import { useOrigin } from "@/hooks/use-origin"

type Props = {}
export const LocaleSwitch = ({}: Props) => {
  const pathname = usePathname()
  const direction = document.documentElement.dir === "rtl" ? "rtl" : "ltr"
  const locale = useLocale()
  const origin = useOrigin()
  const router = useRouter()

  const switchLocale = (targetLocale: string) => {
    const newPath = pathname.replace(`/${locale}`, `/${targetLocale}`)
    return `${origin}${newPath}`
  }

  return (
    <DropdownMenu dir={direction}>
      <DropdownMenuTrigger asChild>
        <Button size={"icon"} variant={"outline"}>
          <Languages className="w-4 h-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent sideOffset={8} align="end">
        <DropdownMenuItem>
          <Button
            onClick={() => router.replace(switchLocale("ar"))}
            size={"sm"}
            variant={"link"}
            disabled={locale === "ar"}
          >
            العربية
          </Button>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Button
            onClick={() => router.replace(switchLocale("en"))}
            size={"sm"}
            variant={"link"}
            disabled={locale === "en"}
          >
            English
          </Button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
