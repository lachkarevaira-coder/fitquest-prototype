import React from "react";
export function TopBar({ title }: { title: string }) {
  return (
    <header className="sticky top-0 z-10 bg-white/80 backdrop-blur border-b border-gray-100">
      <div className="mx-auto max-w-screen-sm px-4 h-14 flex items-center justify-between">
        <h1 className="text-lg font-semibold">{title}</h1>
        <div className="flex items-center gap-3 text-sm text-gray-500">
          demo
        </div>
      </div>
    </header>
  );
}
