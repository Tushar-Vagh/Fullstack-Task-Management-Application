import { Router } from "express";
import { signup, login, changePassword } from "./auth.controller.js";
import auth from "../../middlewares/auth.middleware.js"; 

const router = Router();

router.post("/signup", signup);
router.post("/login", login);

router.put("/change-password", auth, changePassword);


export default router;
