
import { ReactNode } from 'react';

interface OfficialBadgeCardProps {
  icon: ReactNode;
  title: string;
  description: string;
  badge: {
    icon: ReactNode;
    text: string;
    color: string;
  };
  gradient: string;
}

export function OfficialBadgeCard({ icon, title, description, badge, gradient }: OfficialBadgeCardProps) {
  return (
    <div className="relative group">
      <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-blue-800/10 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500"></div>
      <div className="relative flex items-center gap-5 p-6 bg-white/90 dark:bg-gray-800/90 rounded-3xl backdrop-blur-sm hover:bg-white/95 dark:hover:bg-gray-800/95 transition-all duration-300 hover:scale-[1.02] border-2 border-blue-200/50 dark:border-blue-800/50 shadow-xl group-hover:shadow-2xl">
        <div className={`w-16 h-16 bg-gradient-to-r ${gradient} rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
          {icon}
        </div>
        <div className="flex-1">
          <h3 className="font-bold text-gray-800 dark:text-gray-200 text-xl mb-1">{title}</h3>
          <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">{description}</p>
        </div>
        <div className="flex items-center gap-2 px-3 py-2 bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 rounded-full">
          {badge.icon}
          {badge.text && <span className={`text-xs ${badge.color} font-semibold`}>{badge.text}</span>}
        </div>
      </div>
    </div>
  );
}
