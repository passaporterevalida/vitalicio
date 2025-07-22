
import { Progress } from "@/components/ui/progress";
import { Trophy, Star, Zap } from "lucide-react";

interface ProgressBarProps {
  level: number;
  xp: number;
  xpToNextLevel: number;
  className?: string;
}

export function ProgressBar({ level, xp, xpToNextLevel, className }: ProgressBarProps) {
  const percentage = Math.round((xp / xpToNextLevel) * 100);
  
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <div className="flex items-center gap-2">
        <div className="flex items-center justify-center w-8 h-8 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full text-white font-bold text-sm">
          {level}
        </div>
        <Star className="w-4 h-4 text-yellow-500" />
      </div>
      
      <div className="flex-1 min-w-[120px]">
        <div className="flex justify-between items-center mb-1">
          <span className="text-xs font-medium text-muted-foreground">
            Nível {level}
          </span>
          <span className="text-xs text-muted-foreground">
            {xp}/{xpToNextLevel} XP
          </span>
        </div>
        <Progress value={percentage} className="h-2" />
      </div>
      
      <Zap className="w-4 h-4 text-blue-500" />
    </div>
  );
}
