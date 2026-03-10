import { PageHeader } from "@/components/shared"
import { HistoryList } from "@/features/history/components/history-list"
import { HISTORY_ENTRIES } from "@/features/history/data"

export default function HistoryPage() {
  return (
    <div className="flex h-full flex-col">
      <PageHeader
        sectionLabel="History"
        title="Activity Log"
        subtitle={`${HISTORY_ENTRIES.length} total records`}
      />

      <div className="min-h-0 flex-1 overflow-y-auto">
        <HistoryList entries={HISTORY_ENTRIES} />
      </div>
    </div>
  )
}
