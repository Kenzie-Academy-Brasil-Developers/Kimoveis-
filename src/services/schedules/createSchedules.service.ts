import AppDataSource from "../../data-source";
import { Property } from "../../entities/properties.entity";
import { SchedulesUsersProperties } from "../../entities/schedules_users_properties.entity";
import { AppError } from "../../errors/AppError";
import { User } from "../../entities/user.entity";
import "dotenv/config";

const createSchedulesService = async (
  date: Date,
  hour: string,
  propertyId: string,
  userId: string
): Promise<SchedulesUsersProperties> => {
  const scheduleRepository = AppDataSource.getRepository(
    SchedulesUsersProperties
  );
  const propertyRepository = AppDataSource.getRepository(Property);
  const userRepository = AppDataSource.getRepository(User);
  
  const property = await propertyRepository.findOneBy({
    id: propertyId,
  });

  const user = await userRepository.findOneBy({
    id: userId,
  });

  if (!property) {
    throw new AppError("Invalid Property", 404);
  }

  if (!user) {
    throw new AppError("Invalid User", 401);
  }

  const newSchedule = scheduleRepository.create({
    date,
    hour,
    property,
    user,
  });

  if (+hour.split(":")[0] < 8 || +hour.split(":")[0] >= 18) {
    throw new AppError("Invalid hour", 400);
  }

  if (new Date(date).getDay() == 0 || new Date(date).getDay() == 6) {
    throw new AppError("Invalid date", 400);
  }

  const validateSchedule = await scheduleRepository.find({
    where: {
      date: date,
      hour: hour,
    },
  });

  if (validateSchedule.length > 0) {
    throw new AppError("Schedule already exists", 400);
  }

  await scheduleRepository.save(newSchedule);

  return newSchedule;
};

export default createSchedulesService;
