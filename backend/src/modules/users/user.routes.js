import { Router } from "express";
import auth from "../../middlewares/auth.middleware.js";
import {
  getProfile,
  updateProfile,
  updateProfilePicture,
  deleteAccount,
} from "./user.controller.js";
import { upload } from "../../middlewares/upload.middleware.js";

const router = Router();

router.get("/profile", auth, getProfile);
router.put("/profile", auth, updateProfile);

router.post(
  "/profile-picture",
  auth,
  upload.single("image"),
  updateProfilePicture
);

router.delete("/delete-account", auth, deleteAccount);

export default router;
