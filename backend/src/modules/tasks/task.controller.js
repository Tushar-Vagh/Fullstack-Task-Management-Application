import pool from "../../config/db.js";
import uuid from "../../utils/uuid.js";

export const getTasks = async (req, res) => {
  const { search = "", status, page = 1, limit = 5 } = req.query;

  const offset = (page - 1) * limit;

  let baseQuery = "FROM tasks WHERE user_id=?";
  let params = [req.userId];

  if (search) {
    baseQuery += " AND title LIKE ?";
    params.push(`%${search}%`);
  }

  if (status) {
    baseQuery += " AND status=?";
    params.push(status);
  }

  const [[{ total }]] = await pool.query(
    `SELECT COUNT(*) as total ${baseQuery}`,
    params
  );

  const [tasks] = await pool.query(
    `SELECT * ${baseQuery} ORDER BY created_at DESC LIMIT ? OFFSET ?`,
    [...params, Number(limit), Number(offset)]
  );

  res.json({
    data: tasks,
    pagination: {
      total,
      page: Number(page),
      pages: Math.ceil(total / limit),
    },
  });
};
export const createTask = async (req, res) => {
  const { title, status } = req.body;

  if (!title || !title.trim()) {
    return res.status(400).json({ message: "Title is required" });
  }

  const allowedStatus = ["pending", "in_progress", "completed"];
  const finalStatus = allowedStatus.includes(status)
    ? status
    : "pending";

  await pool.query(
    `INSERT INTO tasks (id, user_id, title, status, created_at)
     VALUES (?, ?, ?, ?, NOW())`,
    [uuid(), req.userId, title.trim(), finalStatus]
  );

  res.status(201).json({ message: "Task created" });
};

export const updateTask = async (req, res) => {
  const { title, status } = req.body;

  await pool.query(
    "UPDATE tasks SET title=?, status=? WHERE id=? AND user_id=?",
    [title, status, req.params.id, req.userId]
  );

  res.json({ message: "Task updated" });
};

export const deleteTask = async (req, res) => {
  await pool.query(
    "DELETE FROM tasks WHERE id=? AND user_id=?",
    [req.params.id, req.userId]
  );

  res.json({ message: "Task deleted" });
};
