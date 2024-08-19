"use client"
import { Button } from "@/components/ui/button"
import { useUser } from "@clerk/nextjs"
import { useMutation } from "convex/react"
import { PlusCircle } from "lucide-react"
import { useTranslations } from "next-intl"
import Image from "next/image"
import React from "react"
import { api } from "@/convex/_generated/api"
import { toast } from "sonner"

const DocumentsPage = () => {
  const { user } = useUser()
  const t = useTranslations("Index")
  const create = useMutation(api.documents.create)
  const onCreate = () => {
    const promise = create({
      title: t("Untitled"),
    })
    toast.promise(promise, {
      loading: t("toastLoading"),
      success: t("toastSuccess"),
      error: t("toastError"),
    })
  }

  return (
    <div className="h-full flex flex-col items-center justify-center space-y-4">
      Empty
      {/* <Image
      src={}
      height={"300"}
      width={"400"}
      alt="empty"
      className="dark:hidden"
      />
      <Image
      src={}
      height={"300"}
      width={"400"}
      alt="empty"
      className="hidden dark:block"
      /> */}
      <h2>
        {t("Welcome")} {user?.firstName}&apos;
      </h2>
      <Button onClick={onCreate}>
        <PlusCircle className="h-4 w-4 me-2" />
        {t("CreateNote")}
      </Button>
    </div>
  )
}

export default DocumentsPage
