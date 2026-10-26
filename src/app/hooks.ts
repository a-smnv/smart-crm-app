import { type TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from './store'; // Импортируем типы стора [app/hooks.ts]
//этот файл нужен просто для сокращения кода, чтобы не писать каждый раз тип const tasks = useSelector((state: RootState) => state.crm.tasks);
// Кастомный dispatch, который знает, какие экшены существуют в проекте [app/hooks.ts]
export const useAppDispatch = () => useDispatch<AppDispatch>();

// Кастомный selector, который автоматически подсказывает структуру стейта, когда вы вытаскиваете данные [app/hooks.ts]
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
