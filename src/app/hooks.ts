import { type TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from './store';
//этот файл нужен просто для сокращения кода, чтобы не писать каждый раз тип const tasks = useSelector((state: RootState) => state.crm.tasks);
export const useAppDispatch = () => useDispatch<AppDispatch>();

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
