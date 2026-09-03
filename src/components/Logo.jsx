import React from "react";

export function Logo({ className = "h-6" }) {
  return (
    <svg className={className} viewBox="0 0 120 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* R */}
      <path d="M10 32V8H22C25.3137 8 28 10.6863 28 14C28 17.3137 25.3137 20 22 20H10M20 20L28 32" stroke="white" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round"/>
      {/* A */}
      <path d="M38 32L46 8L54 32M41 24H51" stroke="white" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round"/>
      {/* W (Estilo N invertido com curva fluida) */}
      <path d="M64 32V8L78 32V14C78 10.6863 80.6863 8 84 8C87.3137 8 90 10.6863 90 14V32" stroke="white" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}