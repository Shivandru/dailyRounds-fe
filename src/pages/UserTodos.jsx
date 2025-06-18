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

  return (
    <div className="min-h-screen h-auto  bg-gradient-to-br from-purple-600 via-pink-600 to-blue-600 py-10 px-4">
      {todos.map((el, i) => (
        <div key={i} className="mb-4">
          <TodoItem todo={el} />
        </div>
      ))}
    </div>
  );
};

export default UserTodos;
