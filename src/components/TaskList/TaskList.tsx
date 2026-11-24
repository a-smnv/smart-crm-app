import {
  EmptyState,
  TaskAssignee,
  TaskCard,
  TaskCreatedDate,
  TaskDescription,
  TaskFooter,
  TaskGrid,
  TaskPoints,
  TaskTag,
  TaskTags,
  TaskTitle,
} from "./TaskList.styles";
import { formatTaskDate } from "../../../src/utils/formatDate";
import { useAppSelector } from "../../app/hooks";
import { selectDenormalizedTasks } from "../../features/crmSelectors";

function TaskList() {
  const tasks = useAppSelector(selectDenormalizedTasks);
  return (
    <>
      <TaskGrid>
        {tasks.map((task) => (
          <TaskCard key={task.id} $inProgress={task.status === "in_progress"}>
            <TaskTitle>{task.title}</TaskTitle>
            <TaskDescription>{task.description}</TaskDescription>
            <TaskCreatedDate>{formatTaskDate(task.createdAt)}</TaskCreatedDate>
            <TaskTags>
              {task.labels.map((l) => (
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
      {tasks.length === 0 && (
        <EmptyState>Задач с таким тегом пока нет 🤷‍♂️</EmptyState>
      )}
    </>
  );
}

export default TaskList;
