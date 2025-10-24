import React from "react";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/Card";
import { useAppStore } from "@/store/useAppStore";

export default function Challenges() {
  const list = useAppStore((s) => s.challenges);
  const join = useAppStore((s) => s.join);

  return (
    <div className="mx-auto max-w-screen-sm px-4 py-6 space-y-4">
      {list.map((ch) => (
        <Card key={ch.id} className="flex items-center justify-between">
          <div>
            <div className="font-semibold">{ch.title}</div>
            <div className="text-sm text-gray-600">Цель: {ch.goal}</div>
          </div>
          {ch.joined ? (
            <span className="text-sm text-green-600">
              Участвуешь • {ch.progress}%
            </span>
          ) : (
            <Button onClick={() => join(ch.id)}>Присоединиться</Button>
          )}
        </Card>
      ))}
    </div>
  );
}
