import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { generalFunction } from "../config/generalFuntions";
import { MentionsInput, Mention } from "react-mentions";
import mentionStyle from "../components/mentionStyle";
const TodoPage = () => {
  const { todoId } = useParams();
  const [todo, setTodo] = useState({});
  const [loading, setLoading] = useState(false);
  const [allUsers, setAllUsers] = useState([]);
  const [noteContent, setNoteContent] = useState("");
  const [mentionedIds, setMentionedIds] = useState([]);

  async function fetchTodos() {
    try {
      const { url } = generalFunction.createUrl(`todos/${todoId}`);
      const res = await fetch(url, {
        method: "GET",
        credentials: "include",
      });
      const data = await res.json();
      console.log(data);
      setTodo(data.todo);
    } catch (error) {
      console.log("error", error);
    }
  }
  async function fetchUsers() {
    setLoading(true);
    try {
      const { url } = generalFunction.createUrl("users/allUsers");
      const res = await fetch(url, {
        method: "GET",
        credentials: "include",
      });
      const data = await res.json();
      setAllUsers(data.users);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log("error", error);
    }
  }

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    fetchTodos();
  }, [todoId]);

  async function addNotes() {
    try {
      const { url } = generalFunction.createUrl(`todos/notes/${todoId}`);
      const res = await fetch(url, {
        method: "PATCH",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          content: noteContent,
          user: mentionedIds,
        }),
      });
    } catch (error) {
      console.log("error", error);
    }
  }

  return (
    <div className="min-h-screen h-auto  bg-gradient-to-br from-purple-600 via-pink-600 to-blue-600 py-10 px-4">
      <div className="max-w-3xl mx-auto bg-white/10 backdrop-blur-md rounded-2xl shadow-lg p-6 text-white space-y-6">
        <div>
          <label className="block text-sm mb-1">Title</label>
          <input
            type="text"
            value={todo?.title}
            readOnly
            className="w-full p-3 rounded-xl bg-white/5 border border-white/20 text-white placeholder-white/50"
          />
        </div>

        <div>
          <label className="block text-sm mb-1">Description</label>
          <textarea
            value={todo?.description}
            readOnly
            rows={3}
            className="w-full p-3 rounded-xl bg-white/5 border border-white/20 text-white placeholder-white/50 resize-none"
          />
        </div>

        <div>
          <label className="block text-sm mb-1">Priority</label>
          <div
            className={`inline-block px-4 py-1 rounded-full text-sm font-medium ${
              todo?.priority === "high"
                ? "bg-red-600"
                : todo?.priority === "medium"
                ? "bg-yellow-500"
                : "bg-green-600"
            }`}
          >
            {todo?.priority}
          </div>
        </div>

        <div>
          <label className="block text-sm mb-1">Mentions</label>
          <div className="flex flex-wrap gap-2">
            {todo?.mentions?.length > 0 ? (
              todo?.mentions?.map((m, i) => {
                const user = allUsers?.find((user) => user._id === m);
                return (
                  <span
                    key={i}
                    className="bg-white/10 px-3 py-1 rounded-full text-sm border border-white/20"
                  >
                    @{user?.name || "Unknown User"}
                  </span>
                );
              })
            ) : (
              <span className="text-white/50 text-sm">No mentions</span>
            )}
          </div>
        </div>

        <div>
          <label className="block text-sm mb-1">Notes</label>
          <div className="bg-white/5 border border-white/20 rounded-xl max-h-64 overflow-y-auto space-y-4 p-3">
            {todo?.notes?.length > 0 ? (
              todo?.notes?.map((note) => (
                <div
                  key={note._id || note.createdAt}
                  className="bg-white/10 p-3 rounded-lg text-sm"
                >
                  <div className="text-white/70 mb-1 text-xs">
                    By: {note.user?.name || note.user}
                  </div>
                  <div>{note.content}</div>
                  <div className="text-white/40 mt-1 text-xs">
                    {new Date(note.createdAt).toLocaleString()}
                  </div>
                </div>
              ))
            ) : (
              <p className="text-white/50 text-sm">No notes yet.</p>
            )}
          </div>
        </div>
        <MentionsInput
          value={noteContent}
          onChange={(e) => setNoteContent(e.target.value)}
          placeholder="Add a note and mention users with @..."
          style={mentionStyle}
          className="mb-2"
        >
          <Mention
            trigger="@"
            data={allUsers.map((u) => ({ id: u._id, display: u.name }))}
            displayTransform={(id, display) => `@${display}`}
            markup="@__display__"
            onAdd={(id) => {
              setMentionedIds((prev) => [...new Set([...prev, id])]);
            }}
          />
        </MentionsInput>

        <button
          onClick={addNotes}
          className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition-all"
        >
          Add Note
        </button>
      </div>
    </div>
  );
};

export default TodoPage;
