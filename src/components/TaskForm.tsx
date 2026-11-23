import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { addTask } from '../features/crmSlice';
import { selectAllUsers } from '../features/crmSelectors';
import type{ Task } from '../types/crm.types';
import { nanoid } from '@reduxjs/toolkit';

// 1. Описываем схему валидации через Zod
const taskSchema = z.object({
  title: z.string().min(3, 'Название должно содержать минимум 3 символа'),
  description: z.string().min(5, 'Описание должно быть подробнее (от 5 символов)'),
  // z.coerce.number() автоматически превратит строку из HTML-инпута в число!
  points: z.number().min(1, 'Минимум 1 балл').max(13, 'Максимум 13 баллов по шкале Фибоначчи'),
  assignedTo: z.string(), // Из тега <select> значение всегда приходит строкой
  label: z.string().min(2, 'Укажите хотя бы один тег'),
});

// 2. Магия TypeScript: автоматически генерируем тип формы прямо из схемы Zod!
type TaskFormValues = z.infer<typeof taskSchema>;

export const TaskForm = () => {
  const dispatch = useAppDispatch();
  // Достаем список сотрудников из стора, чтобы вывести их в выпадающем списке
  const users = useAppSelector(selectAllUsers);

  // 3. Инициализируем React Hook Form и связываем его с валидатором Zod
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TaskFormValues>({
    resolver: zodResolver(taskSchema),
    defaultValues: {
      points: 3,
      assignedTo: '',
      label: 'frontend',
    },
  });

  // 4. Функция, которая вызовется ТОЛЬКО если валидация Zod прошла успешно
  const onSubmit = (data: TaskFormValues) => {
    const newTask: Task = {
      id: nanoid(), // Генерируем уникальный строковый ID 
      title: data.title,
      description: data.description,
      // Превращаем строковый ID из select в число или null, если исполнитель не выбран
      assignedTo: data.assignedTo ? Number(data.assignedTo) : null,
      points: data.points,
      status: 'todo',
      labels: [data.label.toLowerCase().trim()],
      createdAt: new Date().toISOString().split('T')[0],
    };

    // Отправляем новую задачу в наш Redux Store!
    dispatch(addTask(newTask));
    
    // Очищаем форму после успешного добавления
    reset();
  };

  return (
    <form 
      onSubmit={handleSubmit(onSubmit)} 
      style={{ 
        backgroundColor: '#fff', 
        padding: '20px', 
        borderRadius: '8px', 
        marginBottom: '30px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
        display: 'grid',
        gap: '15px',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        alignItems: 'start'
      }}
    >
      {/* Поле: Название */}
      <div>
        <input
          {...register('title')} // Привязываем инпут к RHF
          placeholder="Название задачи..."
          style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #cbd5e1', boxSizing: 'border-box' }}
        />
        {errors.title && <span style={{ color: '#ef4444', fontSize: '12px' }}>{errors.title.message}</span>}
      </div>

      {/* Поле: Описание */}
      <div>
        <input
          {...register('description')}
          placeholder="Описание..."
          style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #cbd5e1', boxSizing: 'border-box' }}
        />
        {errors.description && <span style={{ color: '#ef4444', fontSize: '12px' }}>{errors.description.message}</span>}
      </div>

      {/* Поле: Story Points */}
      <div>
        <input
          type="number"
          {...register('points',{valueAsNumber: true})}
          placeholder="Story Points (1-13)"
          style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #cbd5e1', boxSizing: 'border-box' }}
        />
        {errors.points && <span style={{ color: '#ef4444', fontSize: '12px' }}>{errors.points.message}</span>}
      </div>

      {/* Поле: Выбор исполнителя */}
      <div>
        <select
          {...register('assignedTo')}
          style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #cbd5e1', boxSizing: 'border-box', backgroundColor: '#fff' }}
        >
          <option value="">Без исполнителя</option>
          {users.map(user => (
            <option key={user.id} value={user.id}>
              {user.name}
            </option>
          ))}
        </select>
      </div>

      {/* Поле: Тег */}
      <div>
        <input
          {...register('label')}
          placeholder="Тег (например, bug)"
          style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #cbd5e1', boxSizing: 'border-box' }}
        />
        {errors.label && <span style={{ color: '#ef4444', fontSize: '12px' }}>{errors.label.message}</span>}
      </div>

      <button 
        type="submit"
        style={{ 
          padding: '9px 16px', 
          backgroundColor: '#10b981', 
          color: '#fff', 
          border: 'none', 
          borderRadius: '4px', 
          fontWeight: 'bold', 
          cursor: 'pointer' 
        }}
      >
        + Добавить задачу
      </button>
    </form>
  );
};


