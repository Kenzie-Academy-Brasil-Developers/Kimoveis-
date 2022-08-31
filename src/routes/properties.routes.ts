import { Router } from "express";
import {
  createPropertyController,
  listPropertiesController,
} from "../controllers/properties.controller";
import adminMiddleware from "../middlewares/admin.middleware";
import { authMiddleware } from "../middlewares/auth.midlleware";

const propertiesRoutes = Router();

propertiesRoutes.post(
  "",
  authMiddleware,
  adminMiddleware,
  createPropertyController
);
propertiesRoutes.get("", listPropertiesController);

export default propertiesRoutes;
