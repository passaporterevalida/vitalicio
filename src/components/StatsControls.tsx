
import { Settings2 } from "lucide-react";
import { StatsResetDialog } from "./StatsResetDialog";

interface StatsControlsProps {
  onReset: () => void;
  hasAnyData: boolean;
}

export function StatsControls({ onReset, hasAnyData }: StatsControlsProps) {
  if (!hasAnyData) {
    return null;
  }

  return (
    <div className="border-0 shadow-2xl bg-gradient-to-br from-blue-50 via-purple-50 to-white dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 rounded-3xl p-4 mb-8">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Settings2 className="w-5 h-5 text-blue-600" />
          <h3 className="font-semibold text-gray-900 dark:text-white">Controles</h3>
        </div>
        <StatsResetDialog onReset={onReset} />
      </div>
    </div>
  );
}
