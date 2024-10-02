"use client"

import { Cover } from "@/components/cover"
import { Toolbar } from "@/components/toolbar"
import { api } from "@/convex/_generated/api"
import { Id } from "@/convex/_generated/dataModel"
import { useQuery } from "convex/react"

interface DocumentProps {
  params: { documentid: Id<"documents"> }
}
const DocumentIdPage = ({ params }: DocumentProps) => {
  const document = useQuery(api.documents.getById, {
    documentId: params.documentid,
  })

  if (document === undefined) {
    ;<div>loading...</div>
  }

  if (document === null) {
    return <div>Not found</div>
  }

  return (
    <div className="pb-40">
      <Cover url={document?.coverImage} />
      <div className="md:max-w-3xl lg:max-w-7xl mx-auto">
        <Toolbar initialData={document!} />
      </div>
    </div>
  )
}

export default DocumentIdPage
