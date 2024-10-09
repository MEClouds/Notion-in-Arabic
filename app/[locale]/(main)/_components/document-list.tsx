"use client"
import { api } from "@/convex/_generated/api"
import { Doc, Id } from "@/convex/_generated/dataModel"
import { useQuery } from "convex/react"
import { useParams, useRouter } from "next/navigation"
import { useState } from "react"
import { Item } from "./item"
import { cn } from "@/lib/utils"
import { useTranslations } from "next-intl"
import { FileIcon } from "lucide-react"
import { useMobileSidebar } from "@/hooks/use-mobile-sidebar"

type Props = {
  parentDocumentId?: Id<"documents">
  level?: number
  data?: Doc<"documents">[]
}
export const DocumentList = ({ parentDocumentId, level = 0 }: Props) => {
  const params = useParams()
  const t = useTranslations("Index")
  const router = useRouter()
  const MobileSidebar = useMobileSidebar()
  const [expanded, setExpanded] = useState<Record<string, boolean>>({})

  const onExpand = (documentId: string) => {
    setExpanded((prevExpanded) => ({
      ...prevExpanded,
      [documentId]: !prevExpanded[documentId],
    }))
  }

  const documents = useQuery(api.documents.getSidebar, {
    parentDocument: parentDocumentId,
  })

  const onRedirect = (documentId: string) => {
    router.push(`/documents/${documentId}`)
  }

  if (documents === undefined) {
    return (
      <>
        <Item.Skeleton level={level} />
        {level === 0 && (
          <>
            <Item.Skeleton level={level} />
            <Item.Skeleton level={level} />
          </>
        )}
      </>
    )
  }
  return (
    <>
      <p
        style={{
          paddingInlineStart: level ? `${level * 12 + 25}px` : undefined,
        }}
        className={cn(
          " hidden text-sm font-medium text-muted-foreground/80",

          expanded && "last:block",
          level === 0 && "hidden"
        )}
      >
        {t("NoPageInside")}
      </p>
      {documents.map((document) => (
        <div key={document._id}>
          <Item
            id={document._id}
            onClick={() => {
              onRedirect(document._id)
              MobileSidebar.onClose()
            }}
            label={document.title}
            icon={FileIcon}
            documentIcon={document.icon}
            active={params.documentId === document._id}
            level={level}
            onExpand={() => onExpand(document._id)}
            expanded={expanded[document._id]}
          />
          {expanded[document._id] && (
            <DocumentList parentDocumentId={document._id} level={level + 1} />
          )}
        </div>
      ))}
    </>
  )
}
