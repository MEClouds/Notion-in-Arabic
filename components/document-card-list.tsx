"use client"
import { Doc } from "@/convex/_generated/dataModel"
import { formatDate } from "@/lib/utils"
import { FileText, LucideIcon } from "lucide-react"
import Image from "next/image"
import { useRouter } from "next/navigation"

type Props = {
  documents: Doc<"documents">[]
  title: string
  icon: LucideIcon
}
export const DocumentCardList = ({ documents, title, icon: Icon }: Props) => {
  const router = useRouter()
  return (
    <div className=" mx-auto max-w-screen-lg flex-col">
      <h2 className="mt-2 ps-3 flex  text-muted-foreground text-start text-xs">
        <Icon className="h-4 w-4 me-2" />
        {title}
      </h2>
      <div className=" mt-10 px-3 w-full  flex-wrap flex  gap-4">
        {documents.map((document) => (
          <div
            key={document._id}
            onClick={() => router.push(`/documents/${document._id}`)}
            className="h-[144px] w-[144px] bg-secondary rounded-2xl 
              shadow-lg cursor-pointer
             hover:scale-105 transition-all
            "
          >
            <div className="relative h-[44px] w-full inset-0 ">
              {!!document.coverImage && (
                <Image
                  src={document.coverImage}
                  fill
                  className=" object-cover rounded-t-2xl  top-0 h-[30px] "
                  alt="cover image"
                />
              )}
              {!document.coverImage && (
                <div className=" bg-primary/5  rounded-t-2xl  h-[44px]  top-0" />
              )}
              <div className="h-[28px] w-[28px] absolute -bottom-4 start-4 text-3xl text-muted-foreground">
                {!!document.icon && <p>{document.icon}</p>}
                {!document.icon && <FileText className="" />}
              </div>
            </div>

            <h2 className="ps-3 truncate mt-7 text-sm">{document.title}</h2>
            <div className=" mt-4 ps-3 text-muted-foreground text-xs">
              {formatDate(document._creationTime)}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
