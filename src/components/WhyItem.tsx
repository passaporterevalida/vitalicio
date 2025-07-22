
import React from "react";

// Features extras da primeira seção "por que usar"
export function WhyItem({ icon, title, desc }: { icon: React.ReactNode, title: string, desc: string }) {
  return (
    <div className="flex items-start gap-3 bg-muted/70 rounded-lg p-4 sm:p-5 min-h-[80px]">
      <div className="flex-shrink-0 mt-1">{icon}</div>
      <div>
        <div className="font-semibold text-sm sm:text-base leading-tight mb-1">{title}</div>
        <div className="text-muted-foreground text-xs sm:text-sm leading-relaxed">{desc}</div>
      </div>
    </div>
  );
}
