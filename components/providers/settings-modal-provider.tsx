"use client"

import { useEffect, useState } from "react"
import { SettingsModal } from "../modal/settings-modal"

export const SettingsModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) {
    return null
  }

  return (
    <>
      <SettingsModal />
    </>
  )
}
