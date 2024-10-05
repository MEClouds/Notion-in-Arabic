"use client"
import { BlockNoteEditor, locales, PartialBlock } from "@blocknote/core"
import { BlockNoteView } from "@blocknote/mantine"
import { useCreateBlockNote } from "@blocknote/react"
import "@blocknote/mantine/style.css"
import { useLocale } from "next-intl"
import { useTheme } from "next-themes"
import { useEdgeStore } from "@/lib/edgestore"

type Props = {
  initialData?: string
  onChange: (value: string) => void
  editable?: boolean
}
const Editor = ({ initialData, onChange, editable }: Props) => {
  const locale = useLocale() === "ar" ? locales.ar : locales.en
  const dir = document.documentElement.dir === "rtl" ? "rtl" : "ltr"
  const { edgestore } = useEdgeStore()
  const handleUpload = async (file: File) => {
    const response = await edgestore.publicFiles.upload({
      file,
    })
    return response.url
  }

  const { resolvedTheme } = useTheme()
  const editor: BlockNoteEditor = useCreateBlockNote({
    initialContent: initialData
      ? (JSON.parse(initialData) as PartialBlock[])
      : undefined,
    dictionary: locale,

    uploadFile: handleUpload,
    // onEditorContentChange:()=>{

    // }
  })
  return (
    <BlockNoteView
      onChange={() => onChange(JSON.stringify(editor.topLevelBlocks, null, 2))}
      theme={resolvedTheme === "dark" ? "dark" : "light"}
      dir={dir}
      editable={editable}
      editor={editor}
    />
  )
}

export default Editor
