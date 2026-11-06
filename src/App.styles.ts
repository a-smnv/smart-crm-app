import styled from 'styled-components'

/**
 * Стили страницы вынесены из App.tsx в styled-components.
 * Динамические значения приходят через transient-пропсы с префиксом `$`:
 * styled-components не отдаёт их в DOM, а TypeScript проверяет их тип на месте вызова.
 */

/* ─────────────── Каркас страницы ─────────────── */

export const Page = styled.div`
  padding: 30px;
  font-family: sans-serif;
  background-color: #f5f7fb;
  min-height: 100vh;
`

export const Title = styled.h1`
  color: #1e293b;
  margin-bottom: 10px;
`

export const Subtitle = styled.p`
  color: #64748b;
  margin-bottom: 20px;
`

/* ─────────────── Виджеты аналитики по статусам ─────────────── */

export const AnalyticsCard = styled.div`
  background-color: #fff;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  margin-bottom: 25px;
`

export const AnalyticsHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  margin-bottom: 18px;
  flex-wrap: wrap;
  gap: 8px;
`

export const AnalyticsTitle = styled.h2`
  margin: 0;
  font-size: 17px;
  color: #1e293b;
`

export const AnalyticsTotal = styled.span`
  font-size: 13px;
  color: #64748b;
`

export const AnalyticsTotalValue = styled.strong`
  color: #1e293b;
`

export const WidgetGrid = styled.div`
  display: grid;
  gap: 15px;
  grid-template-columns: repeat(auto-fit, minmax(190px, 1fr));
`

export const WidgetCard = styled.div<{ $accent: string }>`
  padding: 16px;
  border-radius: 10px;
  background-color: #f8fafc;
  border-top: 3px solid ${({ $accent }) => $accent};
  display: flex;
  flex-direction: column;
  gap: 10px;
`

export const WidgetLabel = styled.span`
  font-size: 13px;
  color: #475569;
  font-weight: bold;
  text-transform: uppercase;
  letter-spacing: 0.4px;
`

export const WidgetValue = styled.span<{ $accent: string }>`
  font-size: 28px;
  font-weight: bold;
  color: ${({ $accent }) => $accent};
  line-height: 1;
`

export const WidgetMeta = styled.span`
  font-size: 13px;
  color: #94a3b8;
  font-weight: normal;
  margin-left: 6px;
`

export const WidgetTrack = styled.div`
  height: 6px;
  background-color: #e2e8f0;
  border-radius: 3px;
  overflow: hidden;
`

export const WidgetFill = styled.div<{ $share: number; $accent: string }>`
  width: ${({ $share }) => $share}%;
  height: 100%;
  background-color: ${({ $accent }) => $accent};
  border-radius: 3px;
  transition: width 0.3s ease;
`

/* ─────────────── Фильтры по тегам ─────────────── */

export const FilterBar = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 25px;
  flex-wrap: wrap;
`

export const FilterButton = styled.button<{ $active: boolean; $activeColor: string }>`
  padding: 8px 16px;
  border-radius: 20px;
  border: none;
  cursor: pointer;
  font-weight: bold;
  transition: all 0.2s;
  background-color: ${({ $active, $activeColor }) => ($active ? $activeColor : '#e2e8f0')};
  color: ${({ $active }) => ($active ? '#fff' : '#334155')};
`

/* ─────────────── Карточки задач ─────────────── */

export const TaskGrid = styled.div`
  display: grid;
  gap: 15px;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
`

export const TaskCard = styled.div<{ $inProgress: boolean }>`
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  border-left: 5px solid ${({ $inProgress }) => ($inProgress ? '#3b82f6' : '#e2e8f0')};
`

export const TaskTitle = styled.h3`
  margin: 0 0 10px 0;
  color: #0f172a;
`

export const TaskDescription = styled.p`
  color: #64748b;
  font-size: 14px;
  margin: 0 0 15px 0;
`

export const TaskTags = styled.div`
  display: flex;
  gap: 5px;
  margin-bottom: 15px;
  flex-wrap: wrap;
`

export const TaskTag = styled.span`
  font-size: 11px;
  background-color: #eff6ff;
  color: #1e40af;
  padding: 2px 6px;
  border-radius: 4px;
`

export const TaskFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 13px;
`

export const TaskAssignee = styled.span`
  background-color: #e2e8f0;
  padding: 4px 8px;
  border-radius: 4px;
  color: #334155;
  font-weight: bold;
`

export const TaskPoints = styled.span`
  color: #94a3b8;
`

/* ─────────────── Пустое состояние ─────────────── */

export const EmptyState = styled.div`
  text-align: center;
  color: #64748b;
  margin-top: 40px;
  font-size: 18px;
`
