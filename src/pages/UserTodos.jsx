import { useEffect, useState } from "react";
import { generalFunction } from "../config/generalFuntions";
import { useParams } from "react-router-dom";
import { TodoItem } from "../components/TodoItem";

const UserTodos = () => {
  const { userId } = useParams();
  const [todos, setTodos] = useState([]);

  async function fetchTodos() {
    try {
      const { url } = generalFunction.createUrl(`todos/userTodo/${userId}`);
      const res = await fetch(url, {
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
  }, [userId]);

  const downloadCSV = () => {
    if (!todos.length) return;

    const headers = Object.keys(todos[0]);
    const csvRows = [
      headers.join(","), // Header row
      ...todos.map((todo) =>
        headers
          .map((field) => {
            const val = todo[field];
            return typeof val === "string"
              ? `"${val.replace(/"/g, '""')}"`
              : val;
          })
          .join(",")
      ),
    ];

    const csvContent = csvRows.join("\n");
    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = "todos.csv";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen h-auto  bg-gradient-to-br from-purple-600 via-pink-600 to-blue-600 py-10 px-4">
      <button
        onClick={downloadCSV}
        className="mb-6 px-4 py-2 bg-white text-black font-semibold rounded hover:bg-gray-200"
      >
        Download CSV
      </button>
      {todos.map((el, i) => (
        <div key={i} className="mb-4">
          <TodoItem todo={el} />
        </div>
      ))}
    </div>
  );
};

export default UserTodos;
