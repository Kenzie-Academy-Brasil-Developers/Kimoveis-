import { instanceToPlain } from "class-transformer";
import { Request, Response } from "express";
import { AppError } from "../errors/AppError";
import { IUserRequest } from "../interfaces/users";
import createUserService from "../services/users/createUser.service";
import deleteUserService from "../services/users/deleteUser.service";
import listUserService from "../services/users/listUsers.service";

export const createUserController = async (req: Request, res: Response) => {
  try {
    const { name, email, isAdm, password }: IUserRequest = req.body;

    const user = await createUserService({ name, email, isAdm, password });

    return res.status(201).json(instanceToPlain(user));

  } catch (error) {
    if (error instanceof AppError) {
      return res.status(error.statusCode).send({
      message: error.message
      });
    }
  }
};

export const listUserController = async (req: Request, res: Response) => {
  const users = await listUserService();
  return res.json(instanceToPlain(users));
};

export const deleteUserController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const user = await deleteUserService(id);
    if (user) {
      return res.status(204).json();
    }
  } catch (error) {
    if (error instanceof AppError) {
      return res.status(error.statusCode).send({
        message: error.message
      });
    }
  }
};
