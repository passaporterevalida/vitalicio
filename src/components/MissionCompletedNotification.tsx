
import { useEffect, useState } from 'react';
import { Mission } from '@/types/missions';
import { Trophy, Zap, X } from 'lucide-react';

interface MissionCompletedNotificationProps {
  mission: Mission | null;
  onClose: () => void;
}

export function MissionCompletedNotification({ mission, onClose }: MissionCompletedNotificationProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (mission) {
      setIsVisible(true);
      const timer = setTimeout(() => {
        setIsVisible(false);
        setTimeout(onClose, 300);
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [mission, onClose]);

  if (!mission) return null;

  return (
    <div className={`fixed top-20 right-4 z-50 transition-all duration-500 transform ${
      isVisible ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'
    }`}>
      <div className="bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 p-1 rounded-xl shadow-2xl max-w-sm">
        <div className="bg-white dark:bg-gray-800 rounded-lg p-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
                <Trophy className="w-5 h-5 text-white" />
              </div>
              <div className="text-lg font-bold text-yellow-600 dark:text-yellow-400">
                Missão Concluída!
              </div>
            </div>
            <button
              onClick={() => {
                setIsVisible(false);
                setTimeout(onClose, 300);
              }}
              className="text-gray-400 hover:text-gray-600"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
          
          <div className="space-y-3">
            <div>
              <h3 className="font-bold text-gray-800 dark:text-gray-200">{mission.title}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">{mission.objective}</p>
            </div>
            
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 p-3 rounded-lg border border-blue-200 dark:border-blue-700">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Zap className="w-4 h-4 text-yellow-600" />
                  <span className="font-bold text-yellow-600">+{mission.reward.xp} XP</span>
                </div>
                {mission.reward.badge && (
                  <div className="flex items-center gap-1 text-purple-600">
                    <Trophy className="w-4 h-4" />
                    <span className="text-sm font-medium">{mission.reward.badge}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
