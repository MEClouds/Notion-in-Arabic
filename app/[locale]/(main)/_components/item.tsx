"use client"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"
import { Skeleton } from "@/components/ui/skeleton"
import { api } from "@/convex/_generated/api"
import { Id } from "@/convex/_generated/dataModel"
import { useMobileSidebar } from "@/hooks/use-mobile-sidebar"
import { cn } from "@/lib/utils"
import { useUser } from "@clerk/nextjs"
import { DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu"
import { useMutation } from "convex/react"
import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  LucideIcon,
  MoreHorizontal,
  Plus,
  Trash,
} from "lucide-react"
import { useTranslations } from "next-intl"
import { useRouter } from "next/navigation"
import { toast } from "sonner"

type Props = {
  id?: Id<"documents">
  documentIcon?: string
  active?: boolean
  expanded?: boolean
  isSearch?: boolean
  level?: number
  onExpand?: () => void
  label: String
  onClick?: () => void
  icon: LucideIcon
}
export const Item = ({
  label,
  onClick,
  icon: Icon,
  id,
  documentIcon,
  active,
  expanded,
  isSearch,
  level = 0,
  onExpand,
}: Props) => {
  const { user } = useUser()
  const create = useMutation(api.documents.create)
  const archive = useMutation(api.documents.archive)
  const t = useTranslations("Index")
  const MobileSidebar = useMobileSidebar()
  const onArchive = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    event.stopPropagation()
    if (!id) return
    const promise = archive({ id }).then(() => router.push("/documents"))

    toast.promise(promise, {
      loading: t("MovedToTrash"),
      success: t("NoteMovedToTrash"),
      error: t("FailedToArchive"),
    })
  }

  const router = useRouter()
  const handleExpand = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    event.stopPropagation()
    onExpand?.()
  }

  const onCreate = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    event.stopPropagation()
    if (!id) return
    const promise = create({ title: t("untitled"), parentDocument: id }).then(
      (documentId) => {
        if (!expanded) {
          onExpand?.()
        }
        router.push(`/documents/${documentId}`)
      }
    )

    toast.promise(promise, {
      loading: t("toastLoading"),
      success: t("toastSuccess"),
      error: t("toastError"),
    })
  }

  const isRtl = document.documentElement.dir === "rtl"
  const ChevronIcon = expanded
    ? ChevronDown
    : isRtl
    ? ChevronLeft
    : ChevronRight
  return (
    <div
      onClick={onClick}
      role="button"
      style={{
        paddingInlineStart: level ? `${level * 12 + 12}px` : "12px",
      }}
      className={cn(
        "group min-h-[27px] text-sm py-1 pe-3 w-full hover:bg-primary/5 flex items-center text-muted-foreground font-medium",
        active && "bg-primary/5 text-primary"
      )}
    >
      {!!id && (
        <div
          role="button"
          onClick={handleExpand}
          className=" h-full rounded-sm hover:bg-neutral-300 dark:hover:bg-neutral-600 me-1"
        >
          <ChevronIcon className=" h-4 w-4 shrink-0 text-muted-foreground/50" />
        </div>
      )}

      {documentIcon ? (
        <div className=" shrink-0 me-2 text-[19px]">{documentIcon}</div>
      ) : (
        <Icon className=" shrink-0 h-[19px] w-[19px] me-2 text-muted-foreground" />
      )}
      <span className=" truncate">{label}</span>
      {isSearch && (
        <kbd
          className=" rtl:flex-row-reverse ms-auto pointer-events-none inline-flex h-5
         select-none items-center gap-1 rounded border bg-muted
        px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100 "
        >
          <span className="text-xs">Ctrl</span> K
        </kbd>
      )}
      {!!id && (
        <div className="ms-auto flex items-center gap-x-2">
          <DropdownMenu dir={isRtl ? "rtl" : "ltr"}>
            <DropdownMenuTrigger onClick={(e) => e.stopPropagation()} asChild>
              <div
                role="button"
                className="opacity-0 group-hover:opacity-100 h-full ms-auto
               rounded-sm hover:bg-neutral-300 dark:hover:bg-neutral-600"
              >
                <MoreHorizontal className="h-4 w-4 text-muted-foreground" />
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className="w-60 dark:bg-neutral-900"
              align="start"
              forceMount
            >
              <DropdownMenuItem onClick={onArchive}>
                <Trash className="h-4 w-4 me-2" />
                {t("Delete")}
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <div className="text-xs text-muted-foreground p-2">
                {t("lastEdit")} {user?.fullName}
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
          <div
            role="button"
            onClick={onCreate}
            className=" opacity-0 group-hover:opacity-100 h-full ms-auto
           rounded-sm hover:bg-neutral-300 dark:hover:bg-neutral-600
          "
          >
            <Plus className="h-4 w-4 text-muted-foreground" />
          </div>
        </div>
      )}
    </div>
  )
}

Item.Skeleton = function ItemSkeleton({ level }: { level?: number }) {
  return (
    <div
      style={{ paddingInlineStart: level ? `${level * 12 + 25}px` : "12px" }}
      className="flex gap-x-2 py-[3px]"
    >
      <Skeleton className="h-4 w-4" />
      <Skeleton className="h-4 w-[30%]" />
    </div>
  )
}
