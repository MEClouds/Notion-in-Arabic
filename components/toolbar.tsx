"use client"

import { Doc } from "@/convex/_generated/dataModel"
import { IconPicker } from "./icon-picker"
import { Button } from "./ui/button"
import { ImageIcon, Smile, X } from "lucide-react"
import { useTranslations } from "next-intl"
import { ElementRef, useRef, useState } from "react"
import { useMutation } from "convex/react"
import { api } from "@/convex/_generated/api"
import TextareaAutosize from "react-textarea-autosize"
import { useCoverImage } from "@/hooks/use-cover-image"

type Props = {
  initialData: Doc<"documents">
  preview?: boolean
}
export const Toolbar = ({ initialData, preview }: Props) => {
  const t = useTranslations("Index")
  const coverImage = useCoverImage()
  const inputRef = useRef<ElementRef<"textarea">>(null)
  const [isEditing, setIsEditing] = useState(false)
  const [value, setValue] = useState(initialData?.title)
  const removeIcon = useMutation(api.documents.removeIcon)

  const update = useMutation(api.documents.update)

  const enableInput = () => {
    if (preview) return
    setIsEditing(true)
    setTimeout(() => {
      setValue(initialData?.title)
      inputRef.current?.focus()
    }, 0)
  }

  const disableInput = () => setIsEditing(false)

  const onInput = (value: string) => {
    setValue(value)
    update({ id: initialData?._id, title: value || "Untitled" })
  }

  const onKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter") {
      event?.preventDefault()
      disableInput()
    }
  }

  const onIconSelect = (icon: string) => {
    update({
      id: initialData._id,
      icon,
    })
  }

  const onRemoveIcon = () => {
    removeIcon({
      id: initialData._id,
    })
  }
  return (
    <>
      <div className="pl-[54px] group relative max-w-sm  -mt-16">
        {!!initialData?.icon && !preview && (
          <div className="flex items-center gap-x-2 group/icon pt-6">
            <IconPicker onChange={onIconSelect}>
              <p className="text-7xl hover:opacity-75  bg-secondary items-center flex  rounded-full h-[100px] w-[100px]">
                {initialData.icon}
              </p>
            </IconPicker>
            <Button
              onClick={onRemoveIcon}
              className="rounded-full opacity-0 group-hover/icon:opacity-100
         transition text-xs text-muted-foreground "
              variant={"outline"}
              size={"icon"}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        )}
        {!!initialData?.icon && preview && (
          <p className="text-6xl pt-6">{initialData.icon}</p>
        )}
        <div
          className=" opacity-0 group-hover:opacity-100 flex items-center 
   gap-x-1 py-4
    "
        >
          {!initialData?.icon && !preview && (
            <IconPicker onChange={onIconSelect} asChild>
              <Button
                className=" text-muted-foreground text-xs"
                variant={"outline"}
                size={"sm"}
              >
                <Smile className="h-4 w-4 me-2" />
                {t("AddIcon")}
              </Button>
            </IconPicker>
          )}
          {!initialData?.coverImage && !preview && (
            <Button
              className="text-xs text-muted-foreground"
              variant={"outline"}
              size={"sm"}
              onClick={coverImage.onOpen}
            >
              <ImageIcon className="h-4 w-4 me-2" />
              {t("AddCover")}
            </Button>
          )}
        </div>
      </div>
      {isEditing && !preview ? (
        <TextareaAutosize
          ref={inputRef}
          onBlur={disableInput}
          value={value}
          onChange={(e) => onInput(e.target.value)}
          className="text-5xl bg-transparent font-bold break-words outline-none
         text-[#3F3F3F] dark:text-[#CFCFCF] resize-none"
        />
      ) : (
        <div
          onClick={enableInput}
          className="pb-[11.5px] text-5xl font-bold break-words outline-none text-[#3f3f3f] dark:text-[#CFCFCF]"
        >
          {initialData?.title}
        </div>
      )}
    </>
  )
}
