const PreviewLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-full dark:bg-[#1F1F1F]">
      <main className="overflow-y-auto">{children}</main>
    </div>
  )
}

export default PreviewLayout
