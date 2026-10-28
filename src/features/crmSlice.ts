import {createSlice, type PayloadAction} from '@reduxjs/toolkit';
import type { User, Task } from '../types/crm.types';
import type { RootState } from '../app/store';

// 1. Описываем форму (интерфейс) для самого ящика нашего хранилища
interface CRMState {
    users: User[];
    tasks : Task[]
    selectedLabel: string | null; // Тег для будущей фильтрации
}

// 2. Наполняем хранилище стартовыми фейковыми данными
const initialState: CRMState = {
  users: [
    { id: 1, name: 'Иван Иванов', role: 'developer', department: 'IT', status: 'active' },
    { id: 2, name: 'Анна Сидорова', role: 'pm', department: 'Management', status: 'active' },
    { id: 3, name: 'Петр Петров', role: 'developer', department: 'IT', status: 'vacation' },
    { id: 4, name: 'Елена Кузнецова', role: 'qa', department: 'QA', status: 'active' },
  ],
  tasks: [
    { id: '101', title: 'Разработать авторизацию', description: 'Через JWT', assignedTo: 1, points: 5, status: 'in_progress', labels: ['frontend', 'high-priority'], createdAt: '2026-10-01' },
    { id: '102', title: 'Написать тест-план', description: 'Покрыть тестами авторизацию', assignedTo: 4, points: 3, status: 'todo', labels: ['qa'], createdAt: '2026-10-02' },
    { id: '103', title: 'Дизайн профиля', description: 'Макет в Figma', assignedTo: null, points: 2, status: 'review', labels: ['design'], createdAt: '2026-10-03' },
    { id: '104', title: 'Исправить баг со скроллом', description: 'Починить в Safari', assignedTo: 1, points: 1, status: 'done', labels: ['frontend', 'bug'], createdAt: '2026-10-04' },
    { id: '105', title: 'Настроить CI/CD pipeline', description: 'Деплой на прод', assignedTo: 3, points: 8, status: 'in_progress', labels: ['backend', 'high-priority'], createdAt: '2026-10-05' },
  ],
  selectedLabel: null,
};

const crmSlice = createSlice({
    name: "crm",
    initialState,
    reducers:{
    // Функция добавления новой задачи. 
    // PayloadAction<Task> означает, что в комплекте с экшеном мы Обязаны передать объект задачи!
addTask: (state,action:PayloadAction<Task>)=>{ 
     state.tasks.push(action.payload)
},
updateTaskStatus: (state, action: PayloadAction<{ taskId: string; status: Task['status'] }>) => {
      // Ищем в массиве задачу с нужным ID
      const task = state.tasks.find(t => t.id === action.payload.taskId);
      if (task) {
        task.status = action.payload.status; // Меняем ей статус
      }
    },
  },
});
// 1. Простейший селектор — просто достает массив задач из стора
export const selectAllTasks = (state:RootState)=> state.crm.tasks;

export const selectAllUsers = (state: RootState)=> state.crm.users;

export const selectUserMap = (state:RootState)=>{
return state.crm.users.reduce<Record<number, User>>((acc,user)=>{
    acc[user.id]=user;
    return acc;
},{})
}

export const selectDenormalizedTasks = (state:RootState)=>{
    const tasks = state.crm.tasks;
    const usersMap = selectUserMap(state);
    const selectedLabel = state.crm.selectedLabel;

      // Шаг 1: Фильтруем задачи, если выбран конкретный тег
    const filteredTasks = selectedLabel ? tasks.filter(task =>task.labels.includes(selectedLabel)) : tasks; 
  // Шаг 2: Трансформируем массив отфильтрованных задач, добавляя имя сотрудника
  return filteredTasks.map((task)=>{
     // Ищем сотрудника в словаре по id. 
    // Если assignedTo равен null, то и в user будет undefined
    const user = task.assignedTo ? usersMap[task.assignedTo] : undefined;
return {
    ...task,
    assignedName :user ? user.name : 'Исполнитель не назначен'
}  
})
}
// Экспортируем экшенкриэйторы они создают обЪектф экшенов с типом и пэйлоадом, чтобы вызывать их из компонентов
export const { addTask, updateTaskStatus} = crmSlice.actions;
// Экспортируем сам редьюсер, чтобы подключить его к общему шкафу Redux
export default crmSlice.reducer;