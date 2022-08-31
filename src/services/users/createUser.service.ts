import { hash } from "bcryptjs";
import AppDataSource from "../../data-source";
import { User } from "../../entities/user.entity";
import { AppError } from "../../errors/AppError";
import { IUserRequest } from "../../interfaces/users";

const createUserService = async ({
  name,
  email,
  isAdm,
  password,
}: IUserRequest): Promise<User> => {
  const userRepository = AppDataSource.getRepository(User);

  const users = await userRepository.find();
  
  const alreadyExists = users.find((e) => e.email === email);

  if (alreadyExists) {
    throw new AppError("User already exists", 400);
  }

  if (!password) {
    throw new AppError("Password is a required field", 403);
  }

  const hashedPassword = await hash(password, 10);

  const user = userRepository.create({
    name,
    email,
    isAdm,
    password: hashedPassword,
  });

  await userRepository.save(user);

  return user;
};

export default createUserService;
