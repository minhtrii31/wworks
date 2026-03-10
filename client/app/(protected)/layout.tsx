import { cookies } from "next/headers"

import { SidebarProvider } from "@/components/layout/sidebar/context"
import { Sidebar } from "@/components/layout/sidebar"
import { MobileHeader } from "@/components/layout/sidebar/mobile-header"
import { WatermarkFooter } from "@/components/layout/watermark-footer"

export default async function ProtectedLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const cookieStore = await cookies()
  const defaultCollapsed = cookieStore.get("sidebar-collapsed")?.value === "true"

  return (
    <SidebarProvider defaultCollapsed={defaultCollapsed}>
      <div className="flex h-dvh overflow-hidden bg-background">
        <Sidebar />

        <div className="flex min-w-0 flex-1 flex-col overflow-hidden">
          <MobileHeader />

          <main
            className="flex-1 overflow-x-hidden overflow-y-auto"
            id="main-content"
          >
            <div className="relative z-10">{children}</div>
            <WatermarkFooter />
          </main>
        </div>
      </div>
    </SidebarProvider>
  )
}
