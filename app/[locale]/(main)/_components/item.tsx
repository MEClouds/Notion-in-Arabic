"use client"

import { Id } from "@/convex/_generated/dataModel"
import { cn } from "@/lib/utils"
import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  LucideIcon,
} from "lucide-react"

type Props = {
  id?: Id<"documents">
  documentIcon?: string
  active?: boolean
  expanded?: boolean
  isSearch?: boolean
  level?: number
  onExpand?: () => void
  label: String
  onClick: () => void
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
          onClick={() => {}}
          className=" h-full rounded-sm hover:bg-neutral-300 dark:bg-neutral-600 me-1"
        >
          <ChevronIcon className=" h-4 w-4 shrink-0 text-muted-foreground/50" />
        </div>
      )}

      {documentIcon ? (
        <div className=" shrink-0 me-2 text-[19px]">{documentIcon}</div>
      ) : (
        <Icon className=" shrink-0 h-[19px] me-2 text-muted-foreground" />
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
    </div>
  )
}
