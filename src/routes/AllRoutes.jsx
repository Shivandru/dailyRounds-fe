import React from "react";
import { Route, Routes } from "react-router-dom";
import { LandingPage } from "../pages/LandingPage";
import { AuthForm } from "../components/AuthForm";
import { TodoList } from "../components/TodoList";
import { TodoForm } from "../components/TodoForm";
import { UsersList } from "../components/UsersList";
import { TodoApp } from "../components/TodoApp";
const AllRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<AuthForm />} />
      <Route path="/todo" element={<TodoApp />} />
      <Route path="/form" element={<TodoForm />} />
      <Route path="/users" element={<UsersList />} />
    </Routes>
  );
};

export default AllRoutes;
