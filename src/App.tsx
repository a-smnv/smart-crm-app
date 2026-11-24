import { useEffect } from "react";
import { useAppDispatch } from "../src/app/hooks";
import { setApiUsers, setApiTasks } from "./features/crmSlice";
import { useGetTasksQuery, useGetUsersQuery } from "./services/crmApi";
import { TaskForm } from "./components/TaskForm/TaskForm";
import AnalyticsDashboard from "./components/AnalyticsDashboard/AnalyticsDashboard";
import { Page, Title } from "./App.styles";
import FilterBar from "./components/FilterBar/FilterBar";
import TaskList from "./components/TaskList/TaskList";

function App() {
  const dispatch = useAppDispatch();

  const { data: networkTasks, isLoading: isTasksLoading } = useGetTasksQuery();
  const { data: networkUsers, isLoading: isUsersLoading } = useGetUsersQuery();

  useEffect(() => {
    if (networkTasks) {
      dispatch(setApiTasks(networkTasks));
    }
  }, [networkTasks, dispatch]);

  useEffect(() => {
    if (networkUsers) {
      dispatch(setApiUsers(networkUsers));
    }
  }, [networkUsers, dispatch]);

  if (isTasksLoading || isUsersLoading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
          fontFamily: "sans-serif",
          backgroundColor: "#f5f7fb",
          color: "#64748b",
          fontSize: "20px",
        }}
      >
        ⏳ Устанавливаю соединение с сервером и загружаю CRM данные...
      </div>
    );
  }
  return (
    <Page>
      <Title>Smart CRM - Панель задач 🚀</Title>
      <AnalyticsDashboard />
      <TaskForm />
      <FilterBar />
      <TaskList />
    </Page>
  );
}

export default App;
