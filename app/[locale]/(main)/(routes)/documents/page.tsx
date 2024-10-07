"use client"
import { Button } from "@/components/ui/button"
import { useUser } from "@clerk/nextjs"
import { useMutation, useQuery } from "convex/react"
import { Clock3, FileText, PlusCircle } from "lucide-react"
import { useTranslations } from "next-intl"
import Image from "next/image"
import React from "react"
import { api } from "@/convex/_generated/api"
import { toast } from "sonner"
import { useRouter } from "next/navigation"
import { Skeleton } from "@/components/ui/skeleton"
import { DocumentCardList } from "@/components/document-card-list"

const DocumentsPage = () => {
  const { user } = useUser()
  const router = useRouter()
  const t = useTranslations("Index")
  const create = useMutation(api.documents.create)
  const onCreate = () => {
    const promise = create({
      title: t("Untitled"),
    }).then((documentid) => router.push(`/documents/${documentid}`))
    toast.promise(promise, {
      loading: t("toastLoading"),
      success: t("toastSuccess"),
      error: t("toastError"),
    })
  }
  const documents = useQuery(api.documents.getDocuments)

  if (documents === undefined) {
    return (
      <div className="w-full flex items-center justify-center pt-12">
        <Skeleton className="  h-12 w-[20%]" />
      </div>
    )
  }
  return (
    <>
      {documents.length === 0 && (
        <div className="h-full flex flex-col items-center justify-center space-y-4">
          <Image
            src={"/empty.svg"}
            height={"200"}
            width={"300"}
            alt="empty"
            className="dark:hidden"
          />
          <Image
            src={"/empty-dark.svg"}
            height={"200"}
            width={"300"}
            alt="empty"
            className="hidden dark:block"
          />
          <h2>
            {t("Welcome")} {user?.fullName}
          </h2>
          <Button onClick={onCreate}>
            <PlusCircle className="h-4 w-4 me-2" />
            {t("CreateNote")}
          </Button>
        </div>
      )}
      {documents.length > 0 && (
        <>
          <div className="h-full flex flex-col  pt-12 space-y-4 ">
            <h2 className="text-3xl text-center">
              {t("Welcome")} {user?.fullName}
            </h2>
            <DocumentCardList
              documents={documents}
              title={t("RecentDocuments")}
              icon={Clock3}
            />
          </div>
        </>
      )}
    </>
  )
}

export default DocumentsPage
