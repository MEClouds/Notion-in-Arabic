import { create } from "zustand"

type MobileSidebar = {
  collapse: boolean
  onOpen: () => void
  onClose: () => void
}

export const useMobileSidebar = create<MobileSidebar>((set) => ({
  collapse: false,
  onOpen: () => set({ collapse: false }),
  onClose: () => set({ collapse: true }),
}))
