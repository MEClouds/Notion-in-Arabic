"use client"

import { cn } from "@/lib/utils"
import {
  ChevronsLeft,
  ChevronsRight,
  MenuIcon,
  Plus,
  PlusCircle,
  Search,
  Settings,
  Sidebar,
  Trash,
} from "lucide-react"
import { useParams, usePathname } from "next/navigation"
import React, { ElementRef, useRef, useState } from "react"
import { useMediaQuery } from "usehooks-ts"
import { UserItem } from "./uset-item"
import { useMutation } from "convex/react"
import { api } from "@/convex/_generated/api"
import { Item } from "./item"
import { useTranslations } from "next-intl"
import { toast } from "sonner"
import { DocumentList } from "./document-list"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { TrashBox } from "./trash-box"
import { useSearch } from "@/hooks/use-search"
import { useSettings } from "@/hooks/use-settings"
import { Navbar } from "./navbar"

const Navigation = () => {
  const settings = useSettings()
  const params = useParams()

  // Getting the direction of the HTML document (ltr or rtl)
  const htmlDir = document.documentElement.getAttribute("dir")

  // Getting the current pathname using the next/navigation hook
  const pathname = usePathname()

  // Checking if the screen width is less than or equal to 768 pixels
  const isMobile = useMediaQuery("(max-width:768px)")

  // Refs for elements and state variables
  const isResizingRef = useRef(false)
  const sidebarRef = useRef<ElementRef<"aside">>(null)
  const navbarRef = useRef<ElementRef<"div">>(null)
  const [isResetting, setIsResetting] = useState(false)
  const [isCollapsed, setIsCollapsed] = useState(isMobile)
  const t = useTranslations("Index")
  const create = useMutation(api.documents.create)
  const search = useSearch()
  // Function to handle mouse down event when resizing the sidebar
  const handleMouseDown = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    event.preventDefault()
    event.stopPropagation()

    isResizingRef.current = true
    document.addEventListener("mousemove", handleMouseMove)
    document.addEventListener("mouseup", handleMouseUp)
  }

  // Function to handle mouse move event when resizing the sidebar
  const handleMouseMove = (event: MouseEvent) => {
    if (!isResizingRef.current) return

    let newWidth = event.clientX

    // Adjusting width based on the document direction (ltr or rtl)
    if (htmlDir === "rtl") {
      newWidth = window.innerWidth - newWidth
    }
    console.log(newWidth)

    // Ensuring the width stays within certain bounds
    if (newWidth < 240) newWidth = 240
    if (newWidth > 480) newWidth = 480

    // Updating the sidebar and navbar styles based on the new width
    if (sidebarRef.current && navbarRef.current) {
      sidebarRef.current.style.width = `${newWidth}px`
      navbarRef.current.style.setProperty("start", `${newWidth}px`)
      navbarRef.current.style.setProperty("width", `calc(100% - ${newWidth}px)`)
    }
  }

  // Function to handle mouse up event when resizing the sidebar
  const handleMouseUp = () => {
    isResizingRef.current = false
    document.removeEventListener("mousemove", handleMouseMove)
    document.removeEventListener("mouseup", handleMouseUp)
  }
  const resetWidth = () => {
    if (sidebarRef.current && navbarRef.current) {
      setIsCollapsed(false)
      setIsResetting(true)
      console.log("reseting", sidebarRef, navbarRef)
      sidebarRef.current.style.width = isMobile ? "100%" : "240px"
      navbarRef.current.style.setProperty(
        "width",
        isMobile ? "0" : "calc(100% - 240px)"
      )
      // navbarRef.current.style.setProperty(
      //   "inset-inline-start",
      //   isMobile ? "100%" : "240px"
      // )
      setTimeout(() => setIsResetting(false), 300)
    }
  }

  const collapse = () => {
    if (sidebarRef.current && navbarRef.current) {
      setIsCollapsed(true)
      setIsResetting(true)

      sidebarRef.current.style.width = "0"
      navbarRef.current.style.setProperty("width", "100%")
      // navbarRef.current.style.setProperty("inset-inline-start", "0")
      setTimeout(() => setIsResetting(false), 300)
    }
  }

  const handleCreate = () => {
    const promise = create({
      title: t("Untitled"),
    })
    toast.promise(promise, {
      loading: t("toastLoading"),
      success: t("toastSuccess"),
      error: t("toastError"),
    })
  }

  // Rendering the JSX for the Navigation component
  return (
    <>
      {/* Sidebar component */}
      <aside
        ref={sidebarRef}
        className={cn(
          "group/sidebar h-full bg-secondary overflow-y-auto relative flex w-60 flex-col z-[50] ",
          isResetting && "transition-all ease-in-out duration-300",
          isMobile && "w-0"
        )}
      >
        {/* Resizing handle button >> or << */}
        <div
          onClick={collapse}
          role="button"
          className={cn(
            "h-6 w-6 text-muted-foreground rounded-sm hover:bg-neutral-300 dark:hover:bg-neutral-600 absolute top-3 end-2 opacity-0 group-hover/sidebar:opacity-100 transition",
            isMobile && "opacity-100"
          )}
        >
          {htmlDir == "rtl" ? (
            <ChevronsRight className="h-6 w-6" />
          ) : (
            <ChevronsLeft className="h-6 w-6" />
          )}
        </div>
        {/* Sidebar content */}
        <div>
          <UserItem />
          <Item
            label={t("search")}
            icon={Search}
            isSearch
            onClick={search.onOpen}
          />
          <Item
            label={t("Settings")}
            icon={Settings}
            onClick={settings.onOpen}
          />
          <Item onClick={handleCreate} label={t("newPage")} icon={PlusCircle} />
        </div>
        <div className="mt-4">
          <DocumentList />
          <Item onClick={handleCreate} icon={Plus} label={t("newPage")} />
          <Popover>
            <PopoverTrigger className="w-full mt-4">
              <Item label={t("Trash")} icon={Trash} />
            </PopoverTrigger>
            <PopoverContent
              side={isMobile ? "bottom" : htmlDir === "rtl" ? "left" : "right"}
              className="p-0 w-72 z-50"
            >
              <TrashBox />
            </PopoverContent>
          </Popover>
        </div>
        {/*  Resizing handle with mouse */}
        <div
          onMouseDown={handleMouseDown}
          onDoubleClick={resetWidth}
          className="opacity-0 group-hover/sidebar:opacity-100 transition cursor-ew-resize absolute h-full w-1 bg-primary/10 end-0 top-0"
        />
      </aside>

      {/* Navbar component */}
      <div
        ref={navbarRef}
        className={cn(
          " absolute top-0 z-[50] end-0 w-[calc(100%-240px)]",
          isResetting && "transition-all end-0 ease-in-out duration-300",
          isMobile && " w-full"
        )}
      >
        {/* Navbar Menu icon */}
        {!!params.documentid ? (
          <Navbar isCollapsed={isCollapsed} onResetWidth={resetWidth} />
        ) : (
          <nav className="bg-transparent px-3 py-3 w-full">
            {isCollapsed && (
              <MenuIcon
                role="button"
                onClick={resetWidth}
                className="h-6 w-6 text-muted-foreground"
              />
            )}
          </nav>
        )}
      </div>
    </>
  )
}

export default Navigation
