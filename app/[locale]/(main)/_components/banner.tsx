"use client"

import { ConfirmModal } from "@/components/modal/confirm-modal"
import { Button } from "@/components/ui/button"
import { api } from "@/convex/_generated/api"
import { Id } from "@/convex/_generated/dataModel"
import { useMutation } from "convex/react"
import { useTranslations } from "next-intl"
import { useRouter } from "next/navigation"
import { toast } from "sonner"

type Props = {
  documentId: Id<"documents">
}
export const Banner = ({ documentId }: Props) => {
  const router = useRouter()
  const remove = useMutation(api.documents.remove)
  const restore = useMutation(api.documents.restore)

  const t = useTranslations("Index")
  const onRemove = () => {
    const promise = remove({ id: documentId })
    toast.promise(promise, {
      loading: t("DeletingNote"),
      success: t("NoteDeleted"),
      error: t("failedToDeleteNote"),
    })
    router.push("/documents")
  }

  const onRestore = () => {
    const promise = restore({ id: documentId })
    toast.promise(promise, {
      loading: t("RestoringNote"),
      success: t("NoteRestored"),
      error: t("failedToRestore"),
    })
  }

  return (
    <div
      className="w-full bg-red-600  text-center text-sm p-2 text-white flex items-center 
   gap-x-2 justify-center
  "
    >
      <p>{t("TrashPage")}</p>
      <Button
        size={"sm"}
        onClick={onRestore}
        variant={"outline"}
        className=" border-white bg-transparent hover:bg-primary/5
     text-white hover:text-white p-1 px-2 h-auto font-normal"
      >
        {t("Restore")}
      </Button>
      <ConfirmModal onConfirm={onRemove}>
        <Button
          size={"sm"}
          variant={"outline"}
          className=" border-white bg-transparent hover:bg-primary/5
         text-white hover:text-white p-1 px-2 h-auto font-normal"
        >
          {t("Remove")}
        </Button>
      </ConfirmModal>
    </div>
  )
}
