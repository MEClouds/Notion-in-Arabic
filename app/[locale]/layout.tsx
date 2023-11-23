import useTextDirection from "@/hooks/useTextDirection";
import { useLocale } from "next-intl";
import { Inter } from "next/font/google";
import { notFound } from "next/navigation";
import { ReactNode } from "react";

// Can be imported from a shared config
const locales: string[] = ["en", "ar", "es"];
const inter = Inter({ subsets: ["latin"] });
type Props = {
  children: ReactNode;
  params: { locale: string };
};

export default function LocaleLayout({ children }: Props) {
  const locale = useLocale();
  const direction = useTextDirection(locale);
  // Validate that the incoming `locale` parameter is valid
  if (!locales.includes(locale)) notFound();

  return (
    <html lang={locale} dir={direction}>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
