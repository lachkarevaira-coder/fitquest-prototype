import React from "react";
export function Card({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`rounded-2xl border border-gray-200 shadow-sm p-4 bg-white ${className}`}
    >
      {children}
    </div>
  );
}
