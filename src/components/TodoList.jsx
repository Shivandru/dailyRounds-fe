import { Filter, Search, SortAsc } from "lucide-react";
import { useEffect, useState } from "react";
import { TodoItem } from "./TodoItem";

export function TodoList({
  todos,
  loading,
  onUpdate,
  onDelete,
  allUsers,
  fetchTodos,
}) {
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("all");
  const [sort, setSort] = useState("created");
  const [currentPage, setCurrentPage] = useState(1);
  const [prevPage, setPrevPage] = useState(1);
  const todoPerPage = 10;

  const filteredAndSortedTodos = todos
    ?.filter((todo) => {
      const matchesSearch =
        todo.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (todo.description?.toLowerCase().includes(searchTerm.toLowerCase()) ??
          false);

      const matchesFilter =
        filter === "all" ||
        (filter === "completed" && todo.completed) ||
        (filter === "pending" && !todo.completed);

      return matchesSearch && matchesFilter;
    })
    .sort((a, b) => {
      switch (sort) {
        case "priority":
          const priorityOrder = { high: 3, medium: 2, low: 1 };
          return priorityOrder[b.priority] - priorityOrder[a.priority];
        case "alphabetical":
          return a.title.localeCompare(b.title);
        default:
          return (
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          );
      }
    });

  const startIndex = (currentPage - 1) * todoPerPage;
  const endIndex = startIndex + todoPerPage;
  const paginatedTodos = filteredAndSortedTodos.slice(startIndex, endIndex);
  const totalTodos = filteredAndSortedTodos.length;
  const completedCount = todos?.filter((todo) => todo.completed)?.length;
  const totalCount = todos?.length || 0;
  const totalPages = Math.ceil(totalTodos / todoPerPage);
  const handlePageChange = (pageNumber) => {
    if (pageNumber > 0 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  const generatePageNumbers = () => {
    const pageNumbers = [];
    if (totalPages <= 10) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      if (currentPage <= 4) {
        pageNumbers.push(1, 2, 3, 4, 5, "...", totalPages);
      } else if (currentPage > totalPages - 4) {
        pageNumbers.push(
          1,
          "...",
          totalPages - 4,
          totalPages - 3,
          totalPages - 2,
          totalPages - 1,
          totalPages
        );
      } else {
        pageNumbers.push(
          1,
          "...",
          currentPage - 1,
          currentPage,
          currentPage + 1,
          "...",
          totalPages
        );
      }
    }
    return pageNumbers;
  };

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, filter, sort]);

  return (
    <div className="space-y-6">
      <div className="backdrop-blur-md bg-white/10 rounded-2xl p-6 border border-white/20">
        <h2 className="text-xl font-semibold text-white mb-4">Your Progress</h2>
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-white">{totalCount}</div>
            <div className="text-white/60 text-sm">Total</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-400">
              {completedCount}
            </div>
            <div className="text-white/60 text-sm">Completed</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-yellow-400">
              {totalCount - completedCount}
            </div>
            <div className="text-white/60 text-sm">Pending</div>
          </div>
        </div>
        {totalCount > 0 && (
          <div className="mt-4">
            <div className="flex justify-between text-sm text-white/70 mb-2">
              <span>Progress</span>
              <span>{Math.round((completedCount / totalCount) * 100)}%</span>
            </div>
            <div className="w-full bg-white/20 rounded-full h-2">
              <div
                className="bg-gradient-to-r from-green-400 to-green-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${(completedCount / totalCount) * 100}%` }}
              />
            </div>
          </div>
        )}
      </div>
      <div className="backdrop-blur-md bg-white/10 rounded-2xl p-4 border border-white/20 space-y-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/60" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search todos..."
            className="w-full pl-12 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-purple-400/50 focus:border-transparent transition-all duration-200"
          />
        </div>

        <div className="flex flex-wrap gap-2">
          <div className="flex items-center space-x-2">
            <Filter className="w-4 h-4 text-white/60" />
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-[#2c2c2c] text-xs font-[600] focus:outline-none focus:ring-2 focus:ring-purple-400/50"
            >
              <option value="all">All</option>
              <option value="pending">Pending</option>
              <option value="completed">Completed</option>
            </select>
          </div>

          <div className="flex items-center space-x-2">
            <SortAsc className="w-4 h-4 text-white/60" />
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-[#2c2c2c] text-xs font-[600] focus:outline-none focus:ring-2 focus:ring-purple-400/50"
            >
              <option value="created">Date Created</option>
              <option value="priority">Priority</option>
              <option value="alphabetical">Alphabetical</option>
            </select>
          </div>
        </div>
      </div>
      <div className="space-y-3">
        {loading ? (
          <div className="text-center py-8">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
            <p className="text-white/60 mt-2">Loading todos...</p>
          </div>
        ) : filteredAndSortedTodos?.length === 0 ? (
          <div className="text-center py-12 backdrop-blur-md bg-white/10 rounded-2xl border border-white/20">
            <p className="text-white/60 text-lg">
              {searchTerm || filter !== "all"
                ? "No todos match your search or filter criteria"
                : "No todos yet. Create your first one above!"}
            </p>
          </div>
        ) : (
          paginatedTodos?.map((todo) => (
            <TodoItem
              key={todo._id}
              allUsers={allUsers}
              todo={todo}
              onUpdate={onUpdate}
              onDelete={onDelete}
              fetchTodos={fetchTodos}
            />
          ))
        )}
      </div>
      <div className="flex space-x-2">
        {generatePageNumbers().map((pageNumber, index) =>
          pageNumber === "..." ? (
            <span key={index} className="py-2 px-3 text-white/50 select-none">
              ...
            </span>
          ) : (
            <button
              key={index}
              onClick={() => handlePageChange(pageNumber)}
              className={`flex justify-center items-center w-[38px] h-[36px] px-4 py-2 rounded-md font-medium transition-all duration-200 cursor-pointer
          ${
            currentPage === pageNumber
              ? "bg-purple-500 text-white shadow-md"
              : "bg-white/10 text-white/70 hover:bg-white/20"
          }`}
            >
              {pageNumber}
            </button>
          )
        )}
      </div>
    </div>
  );
}
