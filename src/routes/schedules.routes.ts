import { Router } from "express";
import {
  createSchedulesController,
  listAllSchedulesFromImovelController,
} from "../controllers/schedules.controller";
import adminMiddleware from "../middlewares/admin.middleware";
import { authMiddleware } from "../middlewares/auth.midlleware";

const schedulesRoutes = Router();

schedulesRoutes.post("", authMiddleware, createSchedulesController);
schedulesRoutes.get(
  "/properties/:id",
  authMiddleware,
  adminMiddleware,
  listAllSchedulesFromImovelController
);

export default schedulesRoutes;
