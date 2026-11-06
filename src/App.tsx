import { useAppSelector, useAppDispatch } from '../src/app/hooks';
import { selectDenormalizedTasks,selectSelectedLabel, selectAllTasks, selectTaskAnalytics } from '../src/features/crmSelectors';
import {setLabelFilter} from './features/crmSlice'
import type { TaskStatus } from './types/crm.types'
import {
  Page, Title, Subtitle,
  AnalyticsCard, AnalyticsHeader, AnalyticsTitle, AnalyticsTotal, AnalyticsTotalValue,
  WidgetGrid, WidgetCard, WidgetLabel, WidgetValue, WidgetMeta, WidgetTrack, WidgetFill,
  FilterBar, FilterButton,
  TaskGrid, TaskCard, TaskTitle, TaskDescription, TaskTags, TaskTag, TaskFooter, TaskAssignee, TaskPoints,
  EmptyState,
} from './App.styles'

// Ключи берутся прямо из TaskStatus, поэтому TS не даст забыть ни один статус
// и не даст написать опечатку в названии статуса.
const STATUS_META: Record<TaskStatus, { label: string; icon: string; color: string }> = {
  todo: { label: 'К выполнению', icon: '📋', color: '#94a3b8' },
  in_progress: { label: 'В работе', icon: '⚡', color: '#3b82f6' },
  review: { label: 'На ревью', icon: '🔍', color: '#f59e0b' },
  done: { label: 'Готово', icon: '✅', color: '#10b981' },
}

function App(){
  const dispatch = useAppDispatch()
  // Вызываем наш селектор. TypeScript автоматически поймет,
  // что в переменной tasks лежит массив измененных задач с полем assignedName!
  const tasks = useAppSelector(selectDenormalizedTasks);
const activeLabel =useAppSelector(selectSelectedLabel)
  // Достаем САМЫЙ исходный массив задач ТОЛЬКО для того, чтобы собрать из него уникальные теги
    const allRawTasks = useAppSelector(selectAllTasks);

      // Собираем уникальные теги из всех задач
      const uniqueLabels = Array.from(
        new Set(allRawTasks.flatMap(task => task.labels))
      )

  // Селектор уже возвращает Record<TaskStatus, number> — сумму story points по статусам
  const analytics = useAppSelector(selectTaskAnalytics)

  const totalPoints = Object.values(analytics).reduce((sum, points) => sum + points, 0)

  // Object.entries() превращает объект аналитики в массив пар [статус, очки],
  // чтобы из каждого ключа достать русскую подпись и цвет из STATUS_META.
  const analyticsWidgets = (Object.entries(analytics) as Array<[TaskStatus, number]>).map(([status, points]) => {
    const meta = STATUS_META[status]
    const share = totalPoints === 0 ? 0 : Math.round((points / totalPoints) * 100)
    return { status, points, ...meta, share }
  })

  return(
    <Page>
      <Title>Smart CRM - Панель задач 🚀</Title>
      <Subtitle>Изучаем продвинутые методы массивов и объектов</Subtitle>

      {/* Блок виджетов аналитики по статусам */}
      <AnalyticsCard>
        <AnalyticsHeader>
          <AnalyticsTitle>📊 Аналитика по статусам</AnalyticsTitle>
          <AnalyticsTotal>
            Всего story points: <AnalyticsTotalValue>{totalPoints}</AnalyticsTotalValue>
          </AnalyticsTotal>
        </AnalyticsHeader>

        <WidgetGrid>
          {analyticsWidgets.map(widget => (
            <WidgetCard key={widget.status} $accent={widget.color}>
              <WidgetLabel>
                {widget.icon} {widget.label}
              </WidgetLabel>
              <WidgetValue $accent={widget.color}>
                {widget.points}
                <WidgetMeta>SP · {widget.share}%</WidgetMeta>
              </WidgetValue>
              {/* Прогресс-бар доли статуса в общем объёме очков */}
              <WidgetTrack>
                <WidgetFill $share={widget.share} $accent={widget.color} />
              </WidgetTrack>
            </WidgetCard>
          ))}
        </WidgetGrid>
      </AnalyticsCard>

      {/* Блок фильтров (Кнопки) */}
      <FilterBar>
        {/* Кнопка сброса фильтра */}
        <FilterButton $active={activeLabel === null} $activeColor="#1e293b" onClick={()=> dispatch(setLabelFilter(null))}>
          Все задачи
        </FilterButton>
        {/* Рендерим уникальные кнопки тегов */}
        {uniqueLabels.map(label => (
          <FilterButton
            key={label}
            $active={activeLabel === label}
            $activeColor="#3b82f6"
            onClick={() => dispatch(setLabelFilter(label))} // Записываем выбранный тег в Redux
          >
            #{label}
          </FilterButton>
        ))}
      </FilterBar>

      {/* Сетка карточек задач */}
      <TaskGrid>
        {tasks.map(task => (
          <TaskCard key={task.id} $inProgress={task.status === 'in_progress'}>
            <TaskTitle>{task.title}</TaskTitle>
            <TaskDescription>{task.description}</TaskDescription>

            {/* Рендерим маленькие теги внутри самой карточки */}
            <TaskTags>
              {task.labels.map(l => (
                <TaskTag key={l}>#{l}</TaskTag>
              ))}
            </TaskTags>

            <TaskFooter>
              <TaskAssignee>👤 {task.assignedName}</TaskAssignee>
              <TaskPoints>🔥 Points: {task.points}</TaskPoints>
            </TaskFooter>
          </TaskCard>
        ))}
      </TaskGrid>

      {/* Если в выбранном фильтре нет задач */}
      {tasks.length === 0 && (
        <EmptyState>Задач с таким тегом пока нет 🤷‍♂️</EmptyState>
      )}
    </Page>

  );
}

export default App;
