"use client"

import { useEffect, useState } from "react"
import { SettingsModal } from "../modal/settings-modal"
import { CoverImageModal } from "../modal/cover-image-modal"
import React from "react"

export const ModalProvider = () => {
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
      <CoverImageModal />
    </>
  )
}
