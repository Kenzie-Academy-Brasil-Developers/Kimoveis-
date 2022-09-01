import AppDataSource from "../../data-source";
import { Property } from "../../entities/properties.entity";
import { AppError } from "../../errors/AppError";

const listAllSchedulesFromImovelService = async (id: string) => {
  const propertyRepository = AppDataSource.getRepository(Property);

  const schedulesWhitProperties = await propertyRepository.findOne({
    where: {
      id: id,
    },
    relations: {
      schedules: true,
      address: true,
    },
  });

  if (!schedulesWhitProperties) {
    throw new AppError("Schedule not found", 404);
  }

  return schedulesWhitProperties;
};

export default listAllSchedulesFromImovelService;
