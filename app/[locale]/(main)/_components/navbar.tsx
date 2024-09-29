"use client"

import { api } from "@/convex/_generated/api"
import { Id } from "@/convex/_generated/dataModel"
import { useQuery } from "convex/react"
import { MenuIcon } from "lucide-react"
import { useParams } from "next/navigation"
import { Title } from "./title"
import { Banner } from "./banner"
import { Menu } from "./menu"

type Props = {
  isCollapsed: boolean
  onResetWidth: () => void
}
export const Navbar = ({ isCollapsed, onResetWidth }: Props) => {
  const params = useParams()
  const document = useQuery(api.documents.getById, {
    documentId: params.documentid as Id<"documents">,
  })

  if (document === undefined) {
    return (
      <nav className="bg-background dark:bg-[#1f1f1f] px-3 py-2 w-full flex justify-between">
        <Title.Skeleton />
        <div className="flex items-center gap-x-2">
          <Menu.Skeleton />
        </div>
      </nav>
    )
  }

  return (
    <>
      <nav
        className=" bg-background dark:bg-[#1f1f1f] px-3 py-2 w-full flex
   items-center gap-x-4
  "
      >
        {isCollapsed && (
          <MenuIcon
            role="button"
            onClick={onResetWidth}
            className="h-6 w-6 text-muted-foreground"
          />
        )}

        <div className="flex items-center  justify-between w-full">
          <Title initialData={document} />
        </div>
        <div className="flex items-center gap-x-2">
          <Menu documentId={document._id} />
        </div>
      </nav>
      {document.isArchived && <Banner documentId={document._id} />}
    </>
  )
}