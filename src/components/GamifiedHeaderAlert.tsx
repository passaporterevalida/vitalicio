import React from 'react';

interface GamifiedHeaderAlertProps {
  children: React.ReactNode;
  icon?: React.ReactNode;
  className?: string;
}

export function GamifiedHeaderAlert({ children, icon = <span className="text-xl">⭐</span>, className = '' }: GamifiedHeaderAlertProps) {
  return (
    <div className={`bg-green-50 border border-green-200 text-green-800 rounded-xl px-4 py-3 flex items-center gap-2 text-sm sm:text-base font-semibold text-center mt-2 mb-3 max-w-2xl mx-auto shadow ${className}`}>
      {icon}
      {children}
    </div>
  );
} 