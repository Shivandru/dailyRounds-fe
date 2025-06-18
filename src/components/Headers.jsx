import { CheckSquare, LogOut, Users } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { generalFunction } from "../config/generalFuntions";
import toast from "react-hot-toast";
import { useState } from "react";

export function Header({ activeTab, onTabChange, userEmail }) {
  const navigate = useNavigate();
  const [loading, setIsLoading] = useState(false);

  const handleSignOut = async () => {
    setIsLoading(true);
    try {
      const { url } = generalFunction.createUrl("/users/logout");
      const res = await fetch(url, {
        method: "GET",
        credentials: "include",
      });
      setIsLoading(false);
      navigate("/");
      toast.success("Logged out successfully!");
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
      setIsLoading(false);
      console.log("error", error);
    }
  };

  return (
    <header className="backdrop-blur-md bg-white/10 border-b border-white/20 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div
            className="flex items-center space-x-3 cursor-pointer"
            onClick={() => navigate("/")}
          >
            <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
              <CheckSquare className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-white">TodoVibe</h1>
              <p className="text-white/60 text-sm">
                Stay organized, stay vibrant
              </p>
            </div>
          </div>

          <nav className="flex items-center space-x-1">
            <button
              onClick={() => onTabChange("todos")}
              className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                activeTab === "todos"
                  ? "bg-white/20 text-white shadow-lg"
                  : "text-white/70 hover:text-white hover:bg-white/10"
              }`}
            >
              <CheckSquare className="w-4 h-4 inline mr-2" />
              Todos
            </button>
            <button
              onClick={() => onTabChange("users")}
              className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                activeTab === "users"
                  ? "bg-white/20 text-white shadow-lg"
                  : "text-white/70 hover:text-white hover:bg-white/10"
              }`}
            >
              <Users className="w-4 h-4 inline mr-2" />
              Users
            </button>
          </nav>

          <div className="flex items-center space-x-3">
            <div className="text-right">
              <p className="text-white text-sm font-medium">{userEmail}</p>
              <p className="text-white/60 text-xs">Welcome back!</p>
            </div>
            <button
              onClick={handleSignOut}
              className="p-2 text-white/70 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-200"
              title="Sign out"
            >
              <LogOut className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
