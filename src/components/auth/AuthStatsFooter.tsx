
import React from 'react';

export function AuthStatsFooter() {
  return (
    <>
      {/* Rodapé com Estatísticas - Mais Compacto */}
      <div className="mt-6 pt-4 border-t border-gray-100">
        <div className="grid grid-cols-3 gap-3 text-center text-sm">
          <div>
            <div className="font-bold text-blue-600 text-base">1.5k+</div>
            <div className="text-gray-500 text-xs">Questões</div>
          </div>
          <div>
            <div className="font-bold text-green-600 text-base">87%</div>
            <div className="text-gray-500 text-xs">Aprovação</div>
          </div>
          <div>
            <div className="font-bold text-yellow-600 text-base">11,2k</div>
            <div className="text-gray-500 text-xs">Médicos</div>
          </div>
        </div>
      </div>

      {/* Help Text - Mais Compacto */}
      <div className="mt-4 text-center">
        <p className="text-xs text-gray-500">
          Problemas para acessar? Entre em contato conosco.
        </p>
      </div>
    </>
  );
}
