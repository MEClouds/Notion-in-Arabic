import {
  SignInButton,
  SignOutButton,
  SignUpButton,
  UserButton,
  auth,
} from "@clerk/nextjs";
import { useTranslations } from "next-intl";
import Link from "next/link";
import React from "react";

const LandingPage = () => {
  const t = useTranslations("Index");
  const { userId }: { userId: string | null } = auth();

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
      <div>
        {userId ? (
          <>
            <UserButton afterSignOutUrl="/" />
            <SignOutButton>{t("sign-out")}</SignOutButton>
          </>
        ) : (
          <>
            <SignInButton
              afterSignInUrl="/dashboard"
              afterSignUpUrl="/dashboard"
            >
              {t("sign-in")}
            </SignInButton>

            <SignUpButton
              afterSignInUrl="/dashboard"
              afterSignUpUrl="/dashboard"
            >
              {t("sign-up")}
            </SignUpButton>
          </>
        )}
      </div>
    </div>
  );
};

export default LandingPage;
