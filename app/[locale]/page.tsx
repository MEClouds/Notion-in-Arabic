import { useTranslations } from "next-intl";
import Link from "next/link";
import React from "react";

const LandingPage = () => {
  const t = useTranslations("Index");
  return (
    <div>
      <h2>En/Ar next-intel starter code</h2>
      <div>
        <h1>{t("title")}</h1>
      </div>
      <Link href={"/ar"}>
        <h3>عربي</h3>
      </Link>
      <Link href={"/en"}>
        <h3>English</h3>
      </Link>
    </div>
  );
};

export default LandingPage;
