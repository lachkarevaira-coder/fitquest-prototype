import React from "react";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/Card";
import { useAppStore } from "@/store/useAppStore";

export default function Home() {
  const name = useAppStore((s) => s.name);
  const streak = useAppStore((s) => s.streak);

  return (
    <div className="mx-auto max-w-screen-sm px-4 py-6 space-y-6">
      <section className="space-y-2">
        <h2 className="text-2xl font-bold">Привет, {name} 👋</h2>
        <p className="text-gray-600">
          Твоя серия: <b>{streak}</b> дня
        </p>
      </section>

      <Card className="flex items-center justify-between">
        <div>
          <h3 className="font-semibold">Начни тренировку</h3>
          <p className="text-sm text-gray-600">Отслеживай время и прогресс</p>
        </div>
        <Button>Старт</Button>
      </Card>

      <section>
        <h3 className="font-semibold mb-3">Быстрые действия</h3>
        <div className="grid grid-cols-2 gap-3">
          <Button variant="secondary">Добавить воду</Button>
          <Button variant="secondary">Завершить день</Button>
          <Button variant="ghost">История</Button>
          <Button variant="ghost">Друзья</Button>
        </div>
      </section>
    </div>
  );
}
