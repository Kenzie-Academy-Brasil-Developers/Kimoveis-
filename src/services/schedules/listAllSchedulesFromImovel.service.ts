import AppDataSource from "../../data-source";
import { Property } from "../../entities/properties.entity";
import { AppError } from "../../errors/AppError";

const listAllSchedulesFromImovelService = async (propertyId: string) => {
  const propertyRepository = AppDataSource.getRepository(Property);

  const property = await propertyRepository.findOneBy({
    id: propertyId,
  });

  if (!property) {
    throw new AppError("Invalid Property", 404);
  }

  const schedulesWhitProperties = await propertyRepository.findOne({
    where: {
      id: propertyId,
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
