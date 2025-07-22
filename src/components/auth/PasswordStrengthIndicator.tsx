
import React from 'react';
import { Check, X } from 'lucide-react';

interface PasswordStrengthIndicatorProps {
  password: string;
  showIndicator: boolean;
}

export function PasswordStrengthIndicator({ password, showIndicator }: PasswordStrengthIndicatorProps) {
  if (!showIndicator || !password) return null;

  const checks = [
    { label: 'Pelo menos 6 caracteres', test: password.length >= 6 },
    { label: 'Contém letra maiúscula', test: /[A-Z]/.test(password) },
    { label: 'Contém letra minúscula', test: /[a-z]/.test(password) },
    { label: 'Contém número', test: /\d/.test(password) },
  ];

  const strength = checks.filter(check => check.test).length;
  const strengthLabels = ['Muito fraca', 'Fraca', 'Média', 'Boa', 'Forte'];
  const strengthColors = ['bg-red-500', 'bg-orange-500', 'bg-yellow-500', 'bg-blue-500', 'bg-green-500'];

  return (
    <div className="mt-2 p-3 bg-gray-50 rounded-lg text-xs space-y-2">
      <div className="flex items-center justify-between">
        <span className="text-gray-600 font-medium">Força da senha:</span>
        <span className={`px-2 py-1 rounded text-white font-medium ${strengthColors[strength]}`}>
          {strengthLabels[strength]}
        </span>
      </div>
      
      <div className="flex w-full bg-gray-200 rounded-full h-2">
        <div
          className={`h-2 rounded-full transition-all duration-300 ${strengthColors[strength]}`}
          style={{ width: `${(strength / 4) * 100}%` }}
        />
      </div>
      
      <div className="space-y-1">
        {checks.map((check, index) => (
          <div key={index} className="flex items-center gap-2">
            {check.test ? (
              <Check className="w-3 h-3 text-green-600" />
            ) : (
              <X className="w-3 h-3 text-gray-400" />
            )}
            <span className={check.test ? 'text-green-600' : 'text-gray-500'}>
              {check.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
