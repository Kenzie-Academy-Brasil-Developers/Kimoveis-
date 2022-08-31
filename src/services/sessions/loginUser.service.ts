import { compare } from "bcryptjs";
import jwt from "jsonwebtoken";
import "dotenv/config";
import { IUserLogin } from "../../interfaces/users";
import { User } from "../../entities/user.entity";
import AppDataSource from "../../data-source";
import { AppError } from "../../errors/AppError";

const createSessionService = async ({
  email,
  password,
}: IUserLogin): Promise<string> => {
  const userRepository = AppDataSource.getRepository(User);

  const user = await userRepository.findOne({
    where: {
      email: email,
    },
  });

  if (!user) {
    throw new AppError("Invalid email or password", 403);
  }

  if (!user.isActive) {
    throw new AppError("Invalid user", 400);
  }

  const matchPassword = await compare(password, user.password);

  if (!matchPassword) {
    throw new AppError("Invalid email or password", 403);
  }

  const token = jwt.sign(
    {
      isAdm: user.isAdm,
      userId: user.id
    },
    process.env.SECRET_KEY as string,
    {
      subject: user.id,
      expiresIn: "2h",
    }
  );

  return token;
};

export default createSessionService;
