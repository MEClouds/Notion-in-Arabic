"use client"

import { useCoverImage } from "@/hooks/use-cover-image"
import { Dialog, DialogContent, DialogHeader } from "../ui/dialog"
import { useTranslations } from "next-intl"
import { SingleImageDropzone } from "../single-image-upload"
import { useState } from "react"
import { useEdgeStore } from "@/lib/edgestore"
import { useParams } from "next/navigation"
import { useMutation } from "convex/react"
import { api } from "@/convex/_generated/api"
import { Id } from "@/convex/_generated/dataModel"

type Props = {}
export const CoverImageModal = ({}: Props) => {
  const coverImage = useCoverImage()
  const [file, setFile] = useState<File>()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const params = useParams()
  const { edgestore } = useEdgeStore()
  const update = useMutation(api.documents.update)

  const onClose = () => {
    setFile(undefined)
    setIsSubmitting(false)
    coverImage.onClose()
  }

  const onChange = async (file?: File) => {
    if (file) {
      setIsSubmitting(true)
      setFile(file)

      const res = await edgestore.publicFiles.upload({
        file,
        options: {
          replaceTargetUrl: coverImage.url,
        },
      })

      await update({
        id: params.documentid as Id<"documents">,
        coverImage: res.url,
      })

      onClose()
    }
  }

  const t = useTranslations("Index")
  return (
    <Dialog open={coverImage.isOpen} onOpenChange={coverImage.onClose}>
      <DialogContent>
        <DialogHeader>
          <h2 className=" text-center  font-semibold">{t("CoverImage")}</h2>
        </DialogHeader>
        <SingleImageDropzone
          className="w-full outline-none"
          disabled={isSubmitting}
          value={file}
          onChange={onChange}
        />
      </DialogContent>
    </Dialog>
  )
}
