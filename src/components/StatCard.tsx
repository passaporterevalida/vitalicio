import React from 'react';

interface StatCardProps {
  icon: React.ReactNode;
  label: string;
  value: React.ReactNode;
  sublabel?: string;
  bgClass?: string;
}

export function StatCard({ icon, label, value, sublabel, bgClass = '' }: StatCardProps) {
  return (
    <div className={`flex flex-col items-center justify-center rounded-2xl shadow-sm p-4 min-w-[120px] min-h-[90px] ${bgClass} transition-all`}> 
      <div className="mb-1">{icon}</div>
      <div className="text-sm font-semibold text-gray-700 mb-1 text-center">{label}</div>
      <div className="text-2xl font-extrabold text-blue-900 mb-0.5 text-center">{value}</div>
      {sublabel && <div className="text-xs text-gray-400 text-center">{sublabel}</div>}
    </div>
  );
} 