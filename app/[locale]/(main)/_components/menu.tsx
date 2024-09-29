import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Skeleton } from "@/components/ui/skeleton"
import { api } from "@/convex/_generated/api"
import { Id } from "@/convex/_generated/dataModel"
import { useUser } from "@clerk/nextjs"
import { useMutation } from "convex/react"
import { MoreHorizontal, Trash } from "lucide-react"
import { useTranslations } from "next-intl"
import { useRouter } from "next/navigation"
import { toast } from "sonner"

type Props = {
  documentId: Id<"documents">
}
export const Menu = ({ documentId }: Props) => {
  const t = useTranslations("Index")
  const router = useRouter()

  const { user } = useUser()
  const archive = useMutation(api.documents.archive)

  const onArchive = () => {
    const promise = archive({ id: documentId })

    toast.promise(promise, {
      loading: t("MovedToTrash"),
      success: t("NoteMovedToTrash"),
      error: t("FailedToArchive"),
    })

    router.push("/documents")
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button size={"sm"} variant={"ghost"}>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-60"
        align="end"
        alignOffset={8}
        forceMount
      >
        <DropdownMenuItem>
          <Trash className="w-4 h-4 me-2" />
          {t("Delete")}
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <div className="text-xs text-muted-foreground p-2">
          {t("LastEdited")} {user?.firstName}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

Menu.Skeleton = function MenuSkeleton() {
  return <Skeleton className=" h-10 w-10" />
}
