import { useEffect, useState } from "react";
import { generalFunction } from "../config/generalFuntions";
import { Header } from "./Headers";
import { TodoForm } from "./TodoForm";
import { TodoList } from "./TodoList";
import { UsersList } from "./UsersList";

export function TodoApp() {
  const [activeTab, setActiveTab] = useState("todos");
  const [todos, setTodos] = useState([]);
  const [allUsers, setAllUsers] = useState([]);

  async function fetchUsers() {
    try {
      const { url } = generalFunction.createUrl("users/allUsers");
      const res = await fetch(url);
      const data = await res.json();
      setAllUsers(data.users);
    } catch (error) {
      console.log("error", error);
    }
  }

  useEffect(() => {
    fetchUsers();
  }, []);

  async function fetchTodos() {
    try {
      const { url } = generalFunction.createUrl("todos/allTodos");
      const res = await fetch(url,{
        method: "GET",
        credentials: "include",
      });
      const data = await res.json();
      console.log(data);
      setTodos(data.todos);
    } catch (error) {
      console.log("error", error);
    }
  }

  useEffect(() => {
    fetchTodos();
  }, []);

  // if (authLoading) {
  //   return (
  //     <div className="min-h-screen bg-gradient-to-br from-purple-600 via-pink-600 to-blue-600 flex items-center justify-center">
  //       <div className="text-center">
  //         <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-white mb-4"></div>
  //         <p className="text-white text-lg">Loading TodoVibe...</p>
  //       </div>
  //     </div>
  //   )
  // }

  // if (!user) {
  //   return <AuthForm />
  // }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-pink-600 to-blue-600">
      <Header
        activeTab={activeTab}
        onTabChange={setActiveTab}
        // userEmail={user.email}
      />

      <main className="max-w-6xl mx-auto px-4 py-8">
        {activeTab === "todos" ? (
          <div className="space-y-8">
            <TodoForm />
            <TodoList
              todos={todos}
              allUsers={allUsers}
              fetchTodos={fetchTodos}
            />
          </div>
        ) : (
          <UsersList />
        )}
      </main>
    </div>
  );
}
