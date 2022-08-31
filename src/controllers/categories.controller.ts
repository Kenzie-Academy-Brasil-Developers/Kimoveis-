import { Request, Response } from "express";
import { AppError } from "../errors/AppError";
import createCategoryService from "../services/categories/createCategory.service";
import listCategoriesService from "../services/categories/listCategories.service";
import listImovelWhitCategoryService from "../services/categories/listImovelWhitCategory.service";

export const createCategoryController = async (req: Request, res: Response) => {
  try {
    const { name } = req.body;
    const category = await createCategoryService(name);
    return res.status(201).json(category);
  } catch (error) {
    if (error instanceof AppError) {
      return res.status(error.statusCode).send({
        message: error.message,
      });
    }
  }
};

export const listCategoriesController = async (req: Request, res: Response) => {
  const categories = await listCategoriesService();
  return res.status(200).json(categories);
};

export const listImovelWhitCategoryController = async (
  req: Request,
  res: Response
) => {
  try {
    const {id} = req.params;
    const category = await listImovelWhitCategoryService(id);
    return res.status(200).json(category);
  } catch (error) {
    if (error instanceof AppError) {
      return res.status(error.statusCode).send({
        message: error.message,
      });
    }
  }
};
