import { AlertCircle, Circle, Plus, Zap } from "lucide-react";
import { useState, useEffect } from "react";
import { MentionsInput, Mention } from "react-mentions";
import { generalFunction } from "../config/generalFuntions";
import mentionStyle from "./mentionStyle";
import toast from "react-hot-toast";
import Loader from "../ui/Loader";

export function TodoForm({ allUsers, fetchTodos }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("medium");
  const [isExpanded, setIsExpanded] = useState(false);
  const [mentions, setMentionedIds] = useState([]);
  const [loading, setLoading] = useState(false);

  const users = allUsers?.map((u) => ({
    id: u._id,
    display: u.name,
  }));
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (!title.trim()) return;
    try {
      const { url } = generalFunction.createUrl("todos/create");
      const res = await fetch(url, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, description, priority, mentions }),
      });
      setTitle("");
      setDescription("");
      setPriority("medium");
      setIsExpanded(false);
      setLoading(false);
      await fetchTodos();
      toast.success("Todo created successfully!");
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
      setLoading(false);
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

  return (
    <form
      onSubmit={handleSubmit}
      className="backdrop-blur-md bg-white/10 rounded-2xl p-6 border border-white/20 shadow-xl"
    >
      {loading && <Loader />}
      <div className="flex items-center space-x-3 mb-4">
        <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
          <Plus className="w-5 h-5 text-white" />
        </div>
        <h2 className="text-xl font-semibold text-white">Add New Todo</h2>
      </div>

      <div className="space-y-4">
        <div>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            onFocus={() => setIsExpanded(true)}
            placeholder="What needs to be done?"
            className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-purple-400/50 focus:border-transparent transition-all duration-200"
            required
          />
        </div>

        {isExpanded && (
          <div className="space-y-4 animate-in slide-in-from-top-2 duration-200">
            <div>
              <MentionsInput
                value={description}
                onChange={(e) => setDescription(e.target.value)}
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
            </div>

            <div>
              <label className="block text-white/90 text-sm font-medium mb-2">
                Priority
              </label>
              <div className="flex space-x-2">
                {["low", "medium", "high"].map((p) => {
                  const Icon = priorityIcons[p];
                  return (
                    <button
                      key={p}
                      type="button"
                      onClick={() => setPriority(p)}
                      className={`flex-1 px-3 py-2 rounded-lg border border-white/20 transition-all duration-200 ${
                        priority === p
                          ? "bg-white/20 text-white shadow-lg"
                          : "bg-white/5 text-white/70 hover:bg-white/10"
                      }`}
                    >
                      <Icon
                        className={`w-4 h-4 inline mr-2 ${priorityColors[p]}`}
                      />
                      <span className="capitalize text-sm font-medium">
                        {p}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        <div className="flex space-x-2">
          {isExpanded && (
            <button
              type="button"
              onClick={() => {
                setIsExpanded(false);
                setDescription("");
                setPriority("medium");
              }}
              className="px-4 py-2 text-white/70 hover:text-white transition-colors"
            >
              Cancel
            </button>
          )}
          <button
            type="submit"
            // disabled={loading || !title.trim()}
            className="flex-1 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg font-semibold hover:from-purple-600 hover:to-pink-600 focus:outline-none focus:ring-2 focus:ring-purple-400/50 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Add Todo
            {/* {loading ? "Adding..." : "Add Todo"} */}
          </button>
        </div>
      </div>
    </form>
  );
}
