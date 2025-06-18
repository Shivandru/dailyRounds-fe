import {
  AlertCircle,
  Check,
  Circle,
  Edit2,
  Save,
  Trash2,
  X,
  Zap,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { generalFunction } from "../config/generalFuntions";
import { MentionsInput, Mention } from "react-mentions";
import mentionStyle from "./mentionStyle";
import toast from "react-hot-toast";
import Loader from "../ui/Loader";

export function TodoItem({ todo, onUpdate, onDelete, allUsers, fetchTodos }) {
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(todo.title);
  const [editDescription, setEditDescription] = useState(
    todo.description || ""
  );
  const [editPriority, setEditPriority] = useState(todo.priority);
  const [loading, setLoading] = useState(false);
  const [mentions, setMentionedIds] = useState(todo.mentions || []);

  const users = allUsers?.map((u) => ({
    id: u._id,
    display: u.name,
  }));

  const handleSave = async () => {
    if (!editTitle.trim()) return;
    setLoading(true);
    try {
      const { url } = generalFunction.createUrl(`todos/update/${todo._id}`);
      const res = await fetch(url, {
        method: "PATCH",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: editTitle.trim(),
          description: editDescription.trim() || undefined,
          priority: editPriority,
          mentions,
        }),
      });
      await fetchTodos();
      setIsEditing(false);
      setLoading(false);
      toast.success("Todo updated successfully!");
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
      setLoading(false);
      console.log("error", error);
    }
  };

  const handleCancel = () => {
    setEditTitle(todo.title);
    setEditDescription(todo.description || "");
    setEditPriority(todo.priority);
    setIsEditing(false);
  };

  const handleDelete = async () => {
    setLoading(true);
    try {
      const { url } = generalFunction.createUrl(`todos/delete/${todo._id}`);
      const res = await fetch(url, {
        method: "DELETE",
        credentials: "include",
      });
      await fetchTodos();
      setLoading(false);
      toast.success("Todo deleted successfully!");
    } catch (error) {
      setLoading(false);
      toast.error("Something went wrong. Please try again.");
      console.log("error", error);
    }
  };

  const priorityIcons = {
    low: Circle,
    medium: AlertCircle,
    high: Zap,
  };

  const priorityColors = {
    low: "text-green-400",
    medium: "text-yellow-400",
    high: "text-red-400",
  };

  const PriorityIcon = priorityIcons[todo.priority];

  return (
    <div
      className={`backdrop-blur-md bg-white/10 rounded-xl p-4 border border-white/20 shadow-lg transition-all duration-200 hover:shadow-xl ${
        todo.completed ? "opacity-60" : ""
      }`}
    >
      {loading && <Loader />}
      {isEditing ? (
        <div className="space-y-3">
          <input
            type="text"
            value={editTitle}
            onChange={(e) => {
              e.stopPropagation();
              setEditTitle(e.target.value);
            }}
            onClick={(e) => e.stopPropagation()}
            className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-purple-400/50"
            placeholder="Todo title"
          />
          <MentionsInput
            value={editDescription}
            onChange={(e, newVal) => {
              setEditDescription(newVal);
            }}
            onClick={(e) => e.stopPropagation()}
            className="mention-input"
            style={mentionStyle}
            placeholder="Add a description (optional)"
          >
            <Mention
              trigger="@"
              data={users}
              displayTransform={(id, display) => `@${display}`}
              markup="@__display__"
              onAdd={(id, display) => {
                setMentionedIds((prev) => [...new Set([...prev, id])]);
              }}
            />
          </MentionsInput>
          <div className="flex space-x-2">
            {["low", "medium", "high"].map((p) => {
              const Icon = priorityIcons[p];
              return (
                <button
                  key={p}
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setEditPriority(p);
                  }}
                  className={`px-2 py-1 rounded text-xs border border-white/20 transition-all ${
                    editPriority === p
                      ? "bg-white/20 text-white"
                      : "bg-white/5 text-white/70 hover:bg-white/10"
                  }`}
                >
                  <Icon
                    className={`w-3 h-3 inline mr-1 ${priorityColors[p]}`}
                  />
                  {p}
                </button>
              );
            })}
          </div>
          <div className="flex space-x-2">
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleSave();
              }}
              disabled={loading || !editTitle.trim()}
              className="flex-1 px-3 py-2 bg-green-500 text-white rounded-lg text-sm font-medium hover:bg-green-600 transition-colors disabled:opacity-50"
            >
              <Save className="w-4 h-4 inline mr-1" />
              Save
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleCancel();
              }}
              className="px-3 py-2 bg-gray-500 text-white rounded-lg text-sm font-medium hover:bg-gray-600 transition-colors"
            >
              <X className="w-4 h-4 inline mr-1" />
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <div className="flex items-start space-x-3">
          <button
            onClick={() => {
              navigate(`/todo/${todo._id}`);
            }}
            disabled={loading}
            className={`mt-1 w-6 h-6 rounded-full border-2 transition-all duration-200 flex items-center justify-center cursor-pointer`}
          >
            {todo.completed && <Check className="w-4 h-4 text-white" />}
          </button>

          <div className="flex-1 min-w-0">
            <div className="flex items-center space-x-2 mb-1">
              <h3
                className={`text-white font-medium ${
                  todo.completed ? "line-through" : ""
                }`}
              >
                {todo.title}
              </h3>
              <PriorityIcon
                className={`w-4 h-4 ${priorityColors[todo.priority]}`}
              />
            </div>
            {todo.description && (
              <p
                className={`text-white/70 text-sm ${
                  todo.completed ? "line-through" : ""
                }`}
              >
                {todo.description}
              </p>
            )}
            <p className="text-white/50 text-xs mt-2">
              Created {new Date(todo.createdAt).toLocaleDateString()}
            </p>
          </div>

          <div className="flex space-x-1">
            <button
              onClick={(e) => {
                e.stopPropagation();
                setIsEditing(true);
              }}
              className="p-2 text-white/60 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-200"
              title="Edit todo"
            >
              <Edit2 className="w-4 h-4" />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleDelete();
              }}
              disabled={loading}
              className="p-2 text-white/60 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-all duration-200"
              title="Delete todo"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
