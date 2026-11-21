import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import type { User,Task, ServerTodo} from '../types/crm.types';

export const crmApi = createApi({
    reducerPath: 'crmApi', // Уникальное имя этого сервиса в нашем общем сторе
      // Настраиваем базовый URL. Все запросы будут автоматически начинаться с этого адреса
    baseQuery: fetchBaseQuery({baseUrl:'https://jsonplaceholder.typicode.com'}),
  // Описываем эндпоинты (конкретные запросы, которые мы умеем делать)
endpoints: (builder) => ({
        // Запрос на получение списка пользователей
            getUsers: builder.query<User[], void>({ // возвращает массив User[], а аргументов на вход не принимает (void)
                query: ()=> 'users',// Допишется к baseUrl, получится: .../users
            }),
            getTasks: builder.query<Task[], void>({
                query: ()=> 'todos?_limit=10', 
                // Трансформируем ответ сервера под интерфейс нашего приложения!
                transformResponse: (response: ServerTodo[]):Task[] =>{
                    const mockLabels = ['frontend', 'backend', 'qa', 'design', 'high-priority', 'bug'];
               return response.map((todo,index)=>{
                          // Имитируем распределение задач по нашим 4 сотрудникам (id от 1 до 4)
                     const assignedId = (index % 4 )+1; 
                     return{
                           id: String(todo.id),
                        title: todo.title,
                        description: `Сетевая задача, импортированная с сервера. Оригинальный ID: ${todo.id}`,
                        assignedTo: todo.completed ? assignedId : null, // Если завершена, назначаем автора
                        points: (todo.id % 5) + 1, // Генерируем Story Points от 1 до 5 на основе ID
                        status: todo.completed ? 'done' : 'in_progress', // Переводим completed в наши статусы
                        // Даем каждой задаче 1-2 случайных тега для проверки работы наших фильтров
                        labels: [mockLabels[todo.id % mockLabels.length], todo.id % 3 === 0 ? 'high-priority' : 'bug'].filter(Boolean),
                        createdAt: '2026-11-09',
                     }    
               })
               
                }
            }),
}),

});
//RTK Query АВТОМАТИЧЕСКИ генерирует кастомные хуки на основе имен эндпоинтов
export const { useGetUsersQuery, useGetTasksQuery} = crmApi;