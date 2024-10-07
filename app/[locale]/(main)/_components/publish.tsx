"use client"

import { Button } from "@/components/ui/button"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { api } from "@/convex/_generated/api"
import { Doc } from "@/convex/_generated/dataModel"
import { useOrigin } from "@/hooks/use-origin"
import { useMutation } from "convex/react"
import { Check, Copy, Globe2 } from "lucide-react"
import { useTranslations } from "next-intl"
import { useState } from "react"
import { toast } from "sonner"

type Props = {
  initialData: Doc<"documents">
}
export const Publish = ({ initialData }: Props) => {
  const origin = useOrigin()
  const update = useMutation(api.documents.update)
  const [copied, setCopied] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const t = useTranslations("Index")

  const urlLink = `${origin}/preview/${initialData._id}`

  const onPublish = () => {
    setIsSubmitting(true)
    const promise = update({
      id: initialData._id,
      isPublished: true,
    }).finally(() => setIsSubmitting(false))

    toast.promise(promise, {
      loading: t("publishing"),
      success: t("NotePublished"),
      error: t("FailedToPublish"),
    })
  }

  const onUnPublish = () => {
    setIsSubmitting(true)
    const promise = update({
      id: initialData._id,
      isPublished: false,
    }).finally(() => setIsSubmitting(false))

    toast.promise(promise, {
      loading: t("UnPublishing"),
      success: t("NoteUnPublished"),
      error: t("FailedToUnPublish"),
    })
  }

  const onCopy = () => {
    navigator.clipboard.writeText(urlLink)
    setCopied(true)
    setTimeout(() => {
      setCopied(false)
    }, 1000)
  }
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" size={"sm"}>
          {t("Publish")}
          {initialData.isPublished && (
            <Globe2 className="h-4 w-4 text-sky-600 ms-2" />
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-72" align="end" alignOffset={8} forceMount>
        {initialData.isPublished ? (
          <div className=" space-y-4">
            <div className="flex items-center gap-x-2">
              <Globe2 className="text-sky-500 animate-pulse h-4 w-4" />
              <p className=" font-medium text-xs text-sky-500">
                {t("ThisNoteisLive")}
              </p>
            </div>
            <div className=" flex items-center">
              <input
                className="flex-1 px-2 text-xs border rounded-l-md h-8 bg-muted truncate"
                value={urlLink}
                disabled
              />
              <Button
                onClick={onCopy}
                disabled={copied}
                className="h-8 rounded-l-none"
              >
                {copied ? (
                  <Check className="w-4 h-4" />
                ) : (
                  <Copy className="h-4 w-4" />
                )}
              </Button>
            </div>
            <Button
              size={"default"}
              disabled={isSubmitting}
              onClick={onUnPublish}
              className="w-full text-xs"
            >
              {t("UnPublish")}
            </Button>
          </div>
        ) : (
          <div className=" flex flex-col items-center justify-center">
            <Globe2 className="h-8 w-8 text-muted-foreground mb-2" />
            <p className=" text-sm font-medium mb-2">{t("PublishThisNote")}</p>
            <span className=" text-xs text-muted-foreground mb-3">
              {t("shareYourWork")}
            </span>
            <Button
              disabled={isSubmitting}
              onClick={onPublish}
              className="w-full text-xs"
              size={"sm"}
            >
              {t("Publish")}
            </Button>
          </div>
        )}
      </PopoverContent>
    </Popover>
  )
}
