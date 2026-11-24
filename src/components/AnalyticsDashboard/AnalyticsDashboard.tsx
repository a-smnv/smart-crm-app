import { useAppSelector } from "../../app/hooks";
import type { TaskStatus } from "../../types/crm.types";
import { selectTaskAnalytics } from "../../features/crmSelectors";
import {
  AnalyticsCard,
  AnalyticsHeader,
  AnalyticsTitle,
  AnalyticsTotal,
  AnalyticsTotalValue,
  WidgetCard,
  WidgetFill,
  WidgetGrid,
  WidgetLabel,
  WidgetMeta,
  WidgetTrack,
  WidgetValue,
} from "./AnalyticsDashboard.styles";

const STATUS_META: Record<
  TaskStatus,
  { label: string; icon: string; color: string }
> = {
  todo: { label: "К выполнению", icon: "📋", color: "#94a3b8" },
  in_progress: { label: "В работе", icon: "⚡", color: "#3b82f6" },
  review: { label: "На ревью", icon: "🔍", color: "#f59e0b" },
  done: { label: "Готово", icon: "✅", color: "#10b981" },
};

function AnalyticsDashboard() {
  // Селектор уже возвращает Record<TaskStatus, number> — сумму story points по статусам
  const analytics = useAppSelector(selectTaskAnalytics);

  const totalPoints = Object.values(analytics).reduce(
    (sum, points) => sum + points,
    0,
  );

  const analyticsWidgets = (
    Object.entries(analytics) as Array<[TaskStatus, number]>
  ).map(([status, points]) => {
    const meta = STATUS_META[status];
    const share =
      totalPoints === 0 ? 0 : Math.round((points / totalPoints) * 100);
    return { status, points, ...meta, share };
  });

  return (
    <AnalyticsCard>
      <AnalyticsHeader>
        <AnalyticsTitle>📊 Аналитика по статусам</AnalyticsTitle>
        <AnalyticsTotal>
          Всего story points:{" "}
          <AnalyticsTotalValue>{totalPoints}</AnalyticsTotalValue>
        </AnalyticsTotal>
      </AnalyticsHeader>
      <WidgetGrid>
        {analyticsWidgets.map((widget) => (
          <WidgetCard key={widget.status} $accent={widget.color}>
            <WidgetLabel>
              {widget.icon} {widget.label}
            </WidgetLabel>
            <WidgetValue $accent={widget.color}>
              {widget.points}
              <WidgetMeta>SP · {widget.share}%</WidgetMeta>
            </WidgetValue>
            <WidgetTrack>
              <WidgetFill $share={widget.share} $accent={widget.color} />
            </WidgetTrack>
          </WidgetCard>
        ))}
      </WidgetGrid>
    </AnalyticsCard>
  );
}

export default AnalyticsDashboard;
