import { cn } from "@/lib/utils"
import Image from "next/image"
import { Button } from "./ui/button"
import { ImageIcon, X } from "lucide-react"
import { useTranslations } from "next-intl"
import { useCoverImage } from "@/hooks/use-cover-image"
import { useMutation } from "convex/react"
import { api } from "@/convex/_generated/api"
import { useParams } from "next/navigation"
import { Id } from "@/convex/_generated/dataModel"
import { useEdgeStore } from "@/lib/edgestore"

type Props = {
  url?: string
  preview?: boolean
}
export const Cover = ({ url, preview }: Props) => {
  const t = useTranslations("Index")
  const params = useParams()
  const coverImage = useCoverImage()
  const { edgestore } = useEdgeStore()
  const removeCoverImage = useMutation(api.documents.removeCover)

  const onRemove = async () => {
    if (url) {
      await edgestore.publicFiles.delete({
        url: url,
      })
    }
    removeCoverImage({
      id: params.documentid as Id<"documents">,
    })
  }
  return (
    <div
      className={cn(
        "relative w-full h-[35vh] group",
        !url && "h-[12vh]",
        url && "bg-muted"
      )}
    >
      {!!url && <Image src={url} fill alt={"cover"} className="object-cover" />}
      {url && !preview && (
        <div
          className=" opacity-0 group-hover:opacity-100 
         absolute  bottom-4 end-4 flex items-center gap-x-2
        "
        >
          <Button
            onClick={() => coverImage.onReplace(url)}
            className=" text-muted-foreground text-xs"
            variant={"outline"}
            size={"sm"}
          >
            <ImageIcon className="h-4 w-4 me-2" />
            {t("ChangeCover")}
          </Button>

          <Button
            onClick={onRemove}
            className=" text-muted-foreground text-xs"
            variant={"outline"}
            size={"sm"}
          >
            <X className="h-4 w-4 me-2" />
            {t("remove")}
          </Button>
        </div>
      )}
    </div>
  )
}
