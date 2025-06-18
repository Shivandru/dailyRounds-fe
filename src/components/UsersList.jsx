import { Mail, Users } from "lucide-react";
import { useEffect, useState } from "react";
import { generalFunction } from "../config/generalFuntions";
import Loader from "../ui/Loader";
import { useNavigate } from "react-router-dom";

export function UsersList() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [allUsers, setAllUsers] = useState([]);

  async function fetchUsers() {
    setLoading(true);
    try {
      const { url } = generalFunction.createUrl("users/allUsers");
      const res = await fetch(url);
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
  const getInitials = (name) => {
    return name
      .split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const getTimeAgo = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInMinutes = Math.floor(
      (now.getTime() - date.getTime()) / (1000 * 60)
    );

    if (diffInMinutes < 1) return "Just now";
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;

    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) return `${diffInHours}h ago`;

    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 7) return `${diffInDays}d ago`;

    return date.toLocaleDateString();
  };

  const getAvatarColor = (email) => {
    const colors = [
      "from-purple-500 to-pink-500",
      "from-blue-500 to-cyan-500",
      "from-green-500 to-teal-500",
      "from-orange-500 to-red-500",
      "from-indigo-500 to-purple-500",
      "from-pink-500 to-rose-500",
    ];
    const hash = email.split("").reduce((a, b) => a + b.charCodeAt(0), 0);
    return colors[hash % colors.length];
  };

  return (
    <div className="space-y-6">
      {loading && <Loader />}
      <div className="backdrop-blur-md bg-white/10 rounded-2xl p-6 border border-white/20">
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center">
            <Users className="w-5 h-5 text-white" />
          </div>
          <h2 className="text-xl font-semibold text-white">
            Community Members
          </h2>
        </div>
      </div>

      {loading ? (
        <div className="text-center py-8">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
          <p className="text-white/60 mt-2">Loading users...</p>
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {allUsers?.map((user) => (
            <div
              key={user._id}
              className="backdrop-blur-md bg-white/10 rounded-xl p-6 border border-white/20 shadow-lg hover:shadow-xl transition-all duration-200 hover:bg-white/15 cursor-pointer"
              onClick={() => navigate(`/user/${user._id}`)}
            >
              <div className="flex items-center space-x-4 mb-4">
                <div
                  className={`w-12 h-12 bg-gradient-to-br ${getAvatarColor(
                    user.email
                  )} rounded-full flex items-center justify-center`}
                >
                  <span className="text-white font-semibold text-lg">
                    {getInitials(user.name || user.email)}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-white font-medium truncate">
                    {user.name || user.email.split("@")[0]}
                  </h3>
                  <div className="flex items-center space-x-1 text-white/60 text-sm">
                    <Mail className="w-3 h-3" />
                    <span className="truncate">{user.email}</span>
                  </div>
                </div>
              </div>

              <div className="space-y-2 text-sm">
                <div className="flex items-center justify-between text-white/70">
                  <span>Member since</span>
                  <span>{new Date(user?.created_at).toLocaleDateString()}</span>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-white/20"></div>
            </div>
          ))}
        </div>
      )}

      {!loading && allUsers?.length === 0 && (
        <div className="text-center py-12 backdrop-blur-md bg-white/10 rounded-2xl border border-white/20">
          <Users className="w-12 h-12 text-white/40 mx-auto mb-4" />
          <p className="text-white/60 text-lg">No users found</p>
          <p className="text-white/40 text-sm mt-2">
            Be the first to join the community!
          </p>
        </div>
      )}
    </div>
  );
}
