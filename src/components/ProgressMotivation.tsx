import React from 'react';
import { Star } from 'lucide-react';

interface ProgressMotivationProps {
  message: string;
}

export function ProgressMotivation({ message }: ProgressMotivationProps) {
  return (
    <div className="w-full my-3 p-3 rounded-xl bg-gradient-to-r from-yellow-50 to-blue-50 border border-yellow-200 flex items-center gap-2 justify-center shadow-sm">
      <Star className="w-5 h-5 text-yellow-400" />
      <span className="font-medium text-sm text-gray-700">{message}</span>
    </div>
  );
} 