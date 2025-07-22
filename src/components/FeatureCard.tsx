
import { Link } from "react-router-dom";
import React from "react";

// Card de destaque das funcionalidades principais
export function FeatureCard({ title, description, icon, to }: { title: string, description: string, icon: React.ReactNode, to: string }) {
  return (
    <Link 
      to={to} 
      className="w-full bg-card shadow border rounded-xl p-4 sm:p-6 md:p-7 flex flex-col items-center gap-3 hover:scale-105 transition-transform hover:ring-2 hover:ring-primary/40 text-center min-h-[200px] sm:min-h-[220px] justify-center"
    >
      <div className="flex-shrink-0">
        {icon}
      </div>
      <h2 className="text-base sm:text-lg md:text-xl font-semibold mb-1 leading-tight">{title}</h2>
      <p className="text-muted-foreground text-xs sm:text-sm leading-relaxed">{description}</p>
    </Link>
  );
}
