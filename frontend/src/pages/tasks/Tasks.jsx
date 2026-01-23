import { useEffect, useState } from "react";
import {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
} from "../../api/task.api";
import DashboardLayout from "../../components/layout/DashboardLayout";
import toast from "react-hot-toast";


const STATUS = [
  { label: "To Do", value: "pending" },
  { label: "In Progress", value: "in_progress" },
  { label: "Done", value: "completed" },
];

const statusStyle = {
  pending: "bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-200",
  in_progress:
    "bg-yellow-200 text-yellow-800 dark:bg-yellow-800/40 dark:text-yellow-200",
  completed:
    "bg-green-200 text-green-800 dark:bg-green-800/40 dark:text-green-200",
};

export default function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
const [status, setStatus] = useState("pending");
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [savingId, setSavingId] = useState(null);

  const load = async (pageNo = 1) => {
    try {
      setLoading(true);
      const res = await getTasks({
        search,
        status: filterStatus,
        page: pageNo,
        limit: 5,
      });
      setTasks(res.data.data);
      setPages(res.data.pagination.pages);
      setPage(pageNo);
    } catch {
      toast.error("Failed to load tasks");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const t = setTimeout(() => load(1), 400);
    return () => clearTimeout(t);
  }, [search, filterStatus]);

  const addTask = async () => {
    if (title.trim().length < 3) {
      toast.error("Task title must be at least 3 characters");
      return;
    }
    try {
      setLoading(true);
      await createTask({ title, status });
      toast.success("Task added");
      setTitle("");
setStatus("pending");
      load(1);
    } catch {
      toast.error("Failed to add task");
    } finally {
      setLoading(false);
    }
  };

  const saveTask = async (task) => {
    if (task.title.trim().length < 3) {
      toast.error("Title too short");
      return;
    }
    try {
      setSavingId(task.id);
      await updateTask(task.id, {
        title: task.title,
        status: task.status,
      });
      toast.success("Task updated");
      load(page);
    } catch {
      toast.error("Update failed");
    } finally {
      setSavingId(null);
    }
  };

  const removeTask = async (id) => {
    if (!confirm("Delete this task permanently?")) return;
    try {
      await deleteTask(id);
      toast.success("Task deleted");
      load(page);
    } catch {
      toast.error("Delete failed");
    }
  };

  return (
    <DashboardLayout>
      <h1 className="text-3xl font-bold mb-8 text-gray-800 dark:text-white">
        Task Manager
      </h1>

      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow p-6 flex flex-col md:flex-row gap-4 items-center animate-fade-in">
        <input
          className="flex-1 border rounded-xl px-4 py-3 focus:ring-2 focus:ring-green-500 dark:bg-gray-900 dark:text-white"
          placeholder="Enter task title..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <select
  className="border rounded-xl px-4 py-3 dark:bg-gray-900 dark:text-white"
  value={status}
  onChange={(e) => setStatus(e.target.value)}
>
  {STATUS.map((s) => (
    <option key={s.value} value={s.value}>
      {s.label}
    </option>
  ))}
</select>


        <button
          onClick={addTask}
          disabled={loading}
          className="bg-green-600 hover:bg-green-700 active:scale-95 transition-all
                     text-white px-8 py-3 rounded-xl font-semibold disabled:opacity-50"
        >
          Add Task
        </button>
      </div>

      <div className="flex flex-col md:flex-row gap-4 my-6">
        <input
          className="flex-1 border rounded-xl px-4 py-3 dark:bg-gray-800 dark:text-white"
          placeholder="Search tasks..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          className="border rounded-xl px-4 py-3 dark:bg-gray-800 dark:text-white"
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
        >
          <option value="">All Status</option>
          {STATUS.map((s) => (
            <option key={s.value} value={s.value}>
              {s.label}
            </option>
          ))}
        </select>
      </div>

      {loading ? (
        <p className="animate-pulse text-gray-500">Loading tasks...</p>
      ) : tasks.length === 0 ? (
        <p className="text-gray-500">No tasks found</p>
      ) : (
        <div className="space-y-4">
          {tasks.map((t) => (
            <div
              key={t.id}
              className="bg-white dark:bg-gray-800 rounded-2xl shadow p-5
                         flex flex-col md:flex-row gap-4 items-center
                         hover:shadow-xl transition-all"
            >
              <input
                className="flex-1 border rounded-xl px-4 py-2 dark:bg-gray-900 dark:text-white"
                value={t.title}
                onChange={(e) =>
                  setTasks((prev) =>
                    prev.map((x) =>
                      x.id === t.id ? { ...x, title: e.target.value } : x,
                    ),
                  )
                }
              />

              <select
                className="border rounded-xl px-3 py-2 dark:bg-gray-900 dark:text-white"
                value={t.status}
                onChange={(e) =>
                  setTasks((prev) =>
                    prev.map((x) =>
                      x.id === t.id ? { ...x, status: e.target.value } : x,
                    ),
                  )
                }
              >
                {STATUS.map((s) => (
                  <option key={s.value} value={s.value}>
                    {s.label}
                  </option>
                ))}
              </select>

              <span
                className={`px-4 py-1.5 rounded-full text-sm font-semibold tracking-wide ${statusStyle[t.status]}`}
              >
                {STATUS.find((s) => s.value === t.status)?.label}
              </span>

              <div className="flex gap-2">
                <button
                  onClick={() => saveTask(t)}
                  disabled={savingId === t.id}
                  className="px-4 py-2 rounded-lg font-medium
                             text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/30
                             transition-all disabled:opacity-50"
                >
                  {savingId === t.id ? "Saving..." : "Save"}
                </button>

                <button
                  onClick={() => removeTask(t.id)}
                  className="px-4 py-2 rounded-lg font-medium
                             text-red-600 hover:bg-red-50 dark:hover:bg-red-900/30
                             transition-all"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {pages > 1 && (
        <div className="flex justify-center gap-3 mt-10">
          {[...Array(pages)].map((_, i) => (
            <button
              key={i}
              onClick={() => load(i + 1)}
              className={`px-5 py-2 rounded-xl font-medium transition-all
                ${
                  page === i + 1
                    ? "bg-blue-600 text-white"
                    : "bg-white dark:bg-gray-700 border"
                }`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      )}
    </DashboardLayout>
  );
}
