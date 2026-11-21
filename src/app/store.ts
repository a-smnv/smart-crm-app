import {configureStore} from '@reduxjs/toolkit'
import crmReducer from '../features/crmSlice';
import {crmApi} from '../services/crmApi';


//  Создаем и конфигурируем общее хранилище
export const store = configureStore({
    reducer:{
      crm: crmReducer, // Кладем наш ящик CRM в общий стор [app/store.ts]
    [crmApi.reducerPath]:crmApi.reducer,
    },
    // Подключаем мидлвару RTK Query. Мы берем дефолтные мидлвары Redux и добавляем к ним мидлвару нашего API [app/store.ts, services/crmApi.ts]
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(crmApi.middleware),
});

//  Вытаскиваем типы из самого Стора с помощью встроенных возможностей TypeScript
// Тип RootState описывает, какие данные лежат во всем сторе (наш глобальный стейт) [app/store.ts]
export type RootState = ReturnType<typeof store.getState>

// Тип AppDispatch описывает форму нашей функции dispatch (для вызова экшенов) [app/store.ts]
export type AppDispatch = typeof store.dispatch;


