import { Button } from "@/components/ui/button";
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
      <p className=" text-orange-400 font-bold">En/Ar Notion in Arabic</p>
      <div>
        <h1>{t("title")}</h1>
      </div>
      <Link href={"/ar"}>
        <Button>عربي</Button>
      </Link>
      <Link href={"/en"}>
        <Button>English</Button>
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
