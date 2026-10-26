// 1. Ограничиваем список возможных ролей сотрудников
export type UserRole = 'developer' | 'pm' | 'qa' | 'designer';

// 2. Ограничиваем статусы присутствия сотрудника на работе
export type UserStatus = 'active' | 'vacation' | 'fired'

// 3. Описываем, как выглядит объект ОДНОГО сотрудника
export interface User{
    id:number;
    name:string;
    role: UserRole;
    department:string;
    status:UserStatus;
}

// 4. Ограничиваем возможные статусы для задач в канбан-доске
export type TaskStatus = 'todo' | 'in_progress'| 'review' | 'done'

// 5. Описываем, как выглядит объект ОДНОЙ задачи
export interface Task {
  id: string;  
  title:string;            // ID задачи (сделаем строковым, так как часто используются UUID)  title: string;           
  description: string;     // Детальное описание
  assignedTo: number | null; // ID сотрудника, на которого назначена задача. 
                           // Если задача ни на кого не назначена, тут будет null.
  points: number;          // Сложность задачи в Story Points (число)
  status: TaskStatus;      // Статус задачи
  labels: string[];        // Массив текстовых тегов, например ['frontend', 'bug']
  createdAt: string;       // Дата создания в виде строки
}
