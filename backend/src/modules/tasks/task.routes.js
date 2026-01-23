import { Router } from "express";
import auth from "../../middlewares/auth.middleware.js";
import {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
} from "./task.controller.js";

const router = Router();

router.get("/", auth, getTasks);
router.post("/", auth, createTask);
router.put("/:id", auth, updateTask);
router.delete("/:id", auth, deleteTask);

export default router;
