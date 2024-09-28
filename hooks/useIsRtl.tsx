import { isRtlLang } from "rtl-detect"
import { useLocale } from "next-intl"

export default function useIsRtl() {
  const Locale = useLocale()
  return isRtlLang(Locale)
}
