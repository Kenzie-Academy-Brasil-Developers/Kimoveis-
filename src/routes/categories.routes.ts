import { Router } from "express";
import {
  createCategoryController,
  listCategoriesController,
  listImovelWhitCategoryController,
} from "../controllers/categories.controller";
import adminMiddleware from "../middlewares/admin.middleware";
import { authMiddleware } from "../middlewares/auth.midlleware";

const categoriesRoutes = Router();

categoriesRoutes.post("", authMiddleware, adminMiddleware, createCategoryController);
categoriesRoutes.get("", listCategoriesController)
categoriesRoutes.get("/:id/properties", listImovelWhitCategoryController);

export default categoriesRoutes;
