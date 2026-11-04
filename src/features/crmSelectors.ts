import { createSelector } from "@reduxjs/toolkit";
import type { RootState } from "../app/store";
import type { Task, User } from "../types/crm.types";

//  Простейший селектор — просто достает массив задач из стора
export const selectAllTasks = (state:RootState)=> state.crm.tasks;
export const selectAllUsers = (state: RootState)=> state.crm.users;
export const selectSelectedLabel = (state: RootState)=> state.crm.selectedLabel;
// Кэшируем словарь пользователей. 
// Цикл reduce сработает только тогда, когда массив users реально изменится.
export const selectUserMap = createSelector([selectAllUsers],(users)=>{
    return users.reduce<Record<number, User>>((acc,user)=>{
        acc[user.id]=user;
return acc;
    },{})
})
//  Кэшируем сборку и фильтрацию денормализованных задач.
// Функция внутри сработает ТОЛЬКО если изменится массив задач, словарь юзеров или выбранный тег фильтрации.
export const selectDenormalizedTasks = createSelector([selectAllTasks, selectUserMap, selectSelectedLabel],(tasks,users,selectedLabel)=>{
  // Шаг 1: Фильтруем задачи, если выбран конкретный тег
    const filteredTasks = selectedLabel ? tasks.filter(task =>task.labels.includes(selectedLabel)) : tasks; 
  
    // Шаг 2: Трансформируем массив отфильтрованных задач, добавляя имя сотрудника
  return filteredTasks.map((task)=>{
     // Ищем сотрудника в словаре по id. 
    // Если assignedTo равен null, то и в user будет undefined
    const user = task.assignedTo ? users[task.assignedTo] : undefined;
return {
    ...task,
    assignedName :user ? user.name : 'Исполнитель не назначен'
}  
})
}
)

export const selectTaskAnalytics = createSelector(selectAllTasks, (tasks)=>{
    const initialStatusesObject: Record<Task['status'], number>={
        todo:0,
        in_progress:0,
        review:0,
         done:0
        };

return tasks.reduce((acc,task)=>{
acc[task.status]+=task.points;
return acc;
},initialStatusesObject);
})

