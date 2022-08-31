import { Request, Response } from "express";
import { AppError } from "../errors/AppError";
import createSchedulesService from "../services/schedules/createSchedules.service";
import listAllSchedulesFromImovelService from "../services/schedules/listAllSchedulesFromImovel.service";

const createSchedulesController = async (req: Request, res: Response) => {
  try {
    const { date, hour, propertyId } = req.body;
    const userId = req.user.id;
    const schedule = await createSchedulesService(
      date,
      hour,
      propertyId,
      userId
    );

    return res.status(201).json({
      message: "Schedule created",
    });
  } catch (error) {
    if (error instanceof AppError) {
      return res.status(error.statusCode).send({
        message: error.message,
      });
    }
  }
};

const listAllSchedulesFromImovelController = async (
  req: Request,
  res: Response
) => {
  try {
    const { propertyId } = req.params;
    const list = await listAllSchedulesFromImovelService(propertyId);
    return res.status(200).json(list);
  } catch (error) {
    if (error instanceof AppError) {
      return res.status(error.statusCode).send({
        message: error.message,
      });
    }
  }
};

export { createSchedulesController, listAllSchedulesFromImovelController };
