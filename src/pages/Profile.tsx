import React from "react";
import { Card } from "@/components/Card";
import { useAppStore } from "@/store/useAppStore";

export default function Profile() {
  const name = useAppStore((s) => s.name);
  const streak = useAppStore((s) => s.streak);
  const challenges = useAppStore((s) => s.challenges);
  const joined = challenges.filter((c) => c.joined).length;

  return (
    <div className="mx-auto max-w-screen-sm px-4 py-6 space-y-4">
      <Card>
        <div className="text-lg font-semibold">{name}</div>
        <div className="text-sm text-gray-600">Серия: {streak} дня</div>
      </Card>
      <Card>
        <div className="font-semibold mb-2">Достижения</div>
        <ul className="text-sm text-gray-700 list-disc pl-5 space-y-1">
          <li>Активные челленджи: {joined}</li>
          <li>Всего челленджей: {challenges.length}</li>
        </ul>
      </Card>
    </div>
  );
}
