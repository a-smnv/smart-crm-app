import {configureStore} from '@reduxjs/toolkit'
import crmReducer from '../features/crmSlice';

// 1. Создаем и конфигурируем общее хранилище
export const store = configureStore({
    reducer:{
      crm: crmReducer, // Кладем наш ящик CRM в общий стор [app/store.ts]
    }
});

// 2. Вытаскиваем типы из самого Стора с помощью встроенных возможностей TypeScript
// Тип RootState описывает, какие данные лежат во всем сторе (наш глобальный стейт) [app/store.ts]
export type RootState = ReturnType<typeof store.getState>

// Тип AppDispatch описывает форму нашей функции dispatch (для вызова экшенов) [app/store.ts]
export type AppDispatch = typeof store.dispatch;