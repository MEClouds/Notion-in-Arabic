import { SignOutButton, UserButton } from "@clerk/nextjs";
import { useTranslations } from "next-intl";
import React from "react";

const Page = () => {
  const t = useTranslations("Index");

  return (
    <div>
      <h3>{t("dashboardPage")}</h3>
      <UserButton afterSignOutUrl="/" />
      <SignOutButton>{t("sign-out")}</SignOutButton>
    </div>
  );
};

export default Page;
