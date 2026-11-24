import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { addTask } from "../../features/crmSlice";
import { selectAllUsers } from "../../features/crmSelectors";
import type { Task } from "../../types/crm.types";
import { nanoid } from "@reduxjs/toolkit";
import {
  ErrorText,
  InputWrapper,
  StyledInput,
  StyledSelect,
  SubmitButton,
  TaskFormContainer,
} from "./TaskForm.styles";

const taskSchema = z.object({
  title: z.string().min(3, "Название должно содержать минимум 3 символа"),
  description: z
    .string()
    .min(5, "Описание должно быть подробнее (от 5 символов)"),
  points: z
    .number()
    .min(1, "Минимум 1 балл")
    .max(13, "Максимум 13 баллов по шкале Фибоначчи"),
  assignedTo: z.string(), // Из тега <select> значение всегда приходит строкой
  label: z.string().min(2, "Укажите хотя бы один тег"),
});

type TaskFormValues = z.infer<typeof taskSchema>;

export const TaskForm = () => {
  const dispatch = useAppDispatch();
  const users = useAppSelector(selectAllUsers);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TaskFormValues>({
    resolver: zodResolver(taskSchema),
    defaultValues: {
      points: 3,
      assignedTo: "",
      label: "frontend",
    },
  });

  const onSubmit = (data: TaskFormValues) => {
    const newTask: Task = {
      id: nanoid(),
      title: data.title,
      description: data.description,
      assignedTo: data.assignedTo ? Number(data.assignedTo) : null,
      points: data.points,
      status: "todo",
      labels: [data.label.toLowerCase().trim()],
      createdAt: new Date().toISOString().split("T")[0],
    };

    dispatch(addTask(newTask));

    reset();
  };

  return (
    <TaskFormContainer onSubmit={handleSubmit(onSubmit)}>
      <InputWrapper>
        <StyledInput {...register("title")} placeholder="Название задачи..." />
        {errors.title && <ErrorText>{errors.title.message}</ErrorText>}
      </InputWrapper>

      <InputWrapper>
        <StyledInput {...register("description")} placeholder="Описание..." />
        {errors.description && (
          <ErrorText>{errors.description.message}</ErrorText>
        )}
      </InputWrapper>

      <InputWrapper>
        <StyledInput
          type="number"
          {...register("points", { valueAsNumber: true })}
          placeholder="Story Points (1-13)"
        />
        {errors.points && <ErrorText>{errors.points.message}</ErrorText>}
      </InputWrapper>

      <InputWrapper>
        <StyledSelect {...register("assignedTo")}>
          <option value="">Без исполнителя</option>
          {users.map((user) => (
            <option key={user.id} value={user.id}>
              {user.name}
            </option>
          ))}
        </StyledSelect>
      </InputWrapper>

      {/* Поле: Тег */}
      <InputWrapper>
        <StyledInput {...register("label")} placeholder="Тег (например, bug)" />
        {errors.label && <ErrorText>{errors.label.message}</ErrorText>}
      </InputWrapper>

      <SubmitButton type="submit">+ Добавить задачу</SubmitButton>
    </TaskFormContainer>
  );
};
