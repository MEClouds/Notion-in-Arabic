"use client"

import { Avatar, AvatarImage } from "@/components/ui/avatar"
import { SignOutButton, useUser } from "@clerk/nextjs"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"
import { ChevronsUpDown } from "lucide-react"
import { useTranslations } from "next-intl"

type Props = {}
export const UserItem = ({}: Props) => {
  const { user } = useUser()
  const t = useTranslations("Index")
  const direction = document.documentElement.dir === "rtl" ? "rtl" : "ltr"
  return (
    <DropdownMenu dir={direction}>
      <DropdownMenuTrigger asChild>
        <div
          role="button"
          className="flex items-center text-sm p-3 w-full hover:bg-primary/5"
        >
          <div className=" gap-2 flex items-center max-w-[160px]">
            <Avatar className="h-5 w-5">
              <AvatarImage src={user?.imageUrl} />
            </Avatar>
            <span className="text-start font-medium truncate ">
              {user?.fullName}
            </span>
            <ChevronsUpDown className=" text-muted-foreground h-4 w-4" />
          </div>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <div className=" flex flex-col space-y-4 p-3">
          <p className=" text-xs font-medium leading-none  text-muted-foreground">
            {user?.emailAddresses[0].emailAddress}
          </p>
          <div className=" flex items-center gap-x-2">
            <div className=" rounded-md bg-secondary p-1">
              <Avatar className="h-6 w-6">
                <AvatarImage src={user?.imageUrl} />
              </Avatar>
            </div>
            <div className="space-y-1">
              <p className=" text-sm line-clamp-1">{user?.fullName}</p>
            </div>
          </div>
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          asChild
          className="w-full cursor-pointer text-muted-foreground"
        >
          <SignOutButton>{t("sign-out")}</SignOutButton>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
