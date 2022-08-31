import { Request, Response } from "express";
import { AppError } from "../errors/AppError";
import createPropertyService from "../services/properties/createProperties.service";
import listPropertiesService from "../services/properties/listProperties.service";

export const createPropertyController = async (req: Request, res: Response) => {
  try {
    const property = req.body;
    const propertyReturn = await createPropertyService(property);
    return res.status(201).json(propertyReturn);
  } catch (error) {
    if (error instanceof AppError) {
      return res.status(error.statusCode).send({
        message: error.message,
      });
    }
  }
};

export const listPropertiesController = async (req: Request, res: Response) => {
    const properties = await listPropertiesService()
    return res.status(200).json(properties)
};
