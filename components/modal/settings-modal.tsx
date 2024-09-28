"use client"

import { useSettings } from "@/hooks/use-settings"
import { ModeToggle } from "@/components/mode-toggle"
import { Dialog, DialogContent, DialogHeader } from "../ui/dialog"
import { useTranslations } from "next-intl"
import { Label } from "@radix-ui/react-dropdown-menu"

export const SettingsModal = () => {
  const settings = useSettings()
  const t = useTranslations("Index")
  return (
    <Dialog open={settings.isOpen} onOpenChange={settings.onClose}>
      <DialogContent>
        <DialogHeader className="border-b pb-3">
          <h2 className="text-lg font-medium">{t("MySettings")}</h2>
        </DialogHeader>
        <div className="flex items-center justify-between">
          <div className=" flex flex-col gap-y-1">
            <Label>{t("Appearance")}</Label>
            <span className=" text-[0.8rem] text-muted-foreground">
              {t("AppearanceDesc")}
            </span>
          </div>
          <ModeToggle />
        </div>
        <div className="flex items-center justify-between">
          <div className=" flex flex-col gap-y-1">
            <Label>{t("Language")}</Label>
            <span className=" text-[0.8rem] text-muted-foreground">
              {t("LanguageSettingsDesc")}
            </span>
          </div>
          {/* To DO Add Language Changer */}
        </div>
      </DialogContent>
    </Dialog>
  )
}
