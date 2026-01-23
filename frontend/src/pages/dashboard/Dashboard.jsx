import { useEffect, useState } from "react";
import DashboardLayout from "../../components/layout/DashboardLayout";
import { getTasks } from "../../api/task.api";
import { motion } from "framer-motion";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const COLORS = ["#3b82f6", "#facc15", "#22c55e"];

const STATUS_MAP = {
  pending: "Todo",
  in_progress: "In Progress",
  completed: "Done",
};

export default function Dashboard() {
  const [stats, setStats] = useState({
    total: 0,
    todo: 0,
    inProgress: 0,
    done: 0,
    completion: 0,
  });

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
    try {
      const res = await getTasks({ page: 1, limit: 1000 });
      const tasks = res.data.data || [];

      const todo = tasks.filter((t) => t.status === "pending").length;
      const inProgress = tasks.filter(
        (t) => t.status === "in_progress"
      ).length;
      const done = tasks.filter((t) => t.status === "completed").length;

      const total = tasks.length;
      const completion = total ? Math.round((done / total) * 100) : 0;

      setStats({ total, todo, inProgress, done, completion });
    } catch (err) {
      console.error("Dashboard load failed", err);
    }
  };

  const barData = [
    { name: STATUS_MAP.pending, value: stats.todo },
    { name: STATUS_MAP.in_progress, value: stats.inProgress },
    { name: STATUS_MAP.completed, value: stats.done },
  ];

  const pieData = [
    { name: STATUS_MAP.pending, value: stats.todo },
    { name: STATUS_MAP.in_progress, value: stats.inProgress },
    { name: STATUS_MAP.completed, value: stats.done },
  ];

  return (
    <DashboardLayout>
      <motion.h1
        className="text-3xl font-bold mb-8 dark:text-white"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        Dashboard
      </motion.h1>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
        {[
          { label: "Total Tasks", value: stats.total },
          { label: "Todo", value: stats.todo },
          { label: "In Progress", value: stats.inProgress },
          { label: "Completed", value: stats.done },
        ].map((card, i) => (
          <motion.div
            key={i}
            className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <p className="text-gray-500 text-sm">{card.label}</p>
            <h2 className="text-3xl font-bold dark:text-white">
              {card.value}
            </h2>
          </motion.div>
        ))}
      </div>

      <motion.div
        className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow mb-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <p className="text-sm mb-2 text-gray-500">Completion Progress</p>
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-4">
          <motion.div
            className="bg-green-500 h-4 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${stats.completion}%` }}
            transition={{ duration: 1 }}
          />
        </div>
        <p className="text-sm mt-2 text-gray-400">
          {stats.completion}% completed
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <motion.div
          className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <h3 className="font-semibold mb-4 dark:text-white">
            Task Status Overview
          </h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={barData}>
              <XAxis dataKey="name" />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Bar dataKey="value" fill="#3b82f6" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>

        <motion.div
          className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <h3 className="font-semibold mb-4 dark:text-white">
            Task Distribution
          </h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={pieData}
                dataKey="value"
                innerRadius={60}
                outerRadius={90}
                paddingAngle={4}
              >
                {pieData.map((_, i) => (
                  <Cell key={i} fill={COLORS[i]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </motion.div>
      </div>

      <motion.div
        className="mt-10 bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-6 rounded-xl shadow"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
      >
        {stats.completion === 100 ? (
          <p className="text-lg font-semibold">
            🎉 Amazing! You completed all tasks!
          </p>
        ) : (
          <p className="text-lg font-semibold">
            🚀 Keep going! Just {100 - stats.completion}% more to finish all
            tasks.
          </p>
        )}
      </motion.div>
    </DashboardLayout>
  );
}
