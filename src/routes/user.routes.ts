import { Router } from "express";
import {
  createUserController,
  deleteUserController,
  listUserController,
} from "../controllers/users.controllers";
import adminMiddleware from "../middlewares/admin.middleware";
import { authMiddleware } from "../middlewares/auth.midlleware";

const userRoutes = Router();

userRoutes.post("", createUserController);

userRoutes.get("", authMiddleware, adminMiddleware, listUserController);

userRoutes.delete(
  "/:id",
  authMiddleware,
  adminMiddleware,
  deleteUserController
);

export default userRoutes;
