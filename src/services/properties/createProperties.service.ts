import AppDataSource from "../../data-source";
import { Address } from "../../entities/adresses.entity";
import { Category } from "../../entities/categories.entity";
import { Property } from "../../entities/properties.entity";
import { AppError } from "../../errors/AppError";
import { IPropertyRequest } from "../../interfaces/properties";

const createPropertyService = async (
  property: IPropertyRequest
): Promise<Property> => {
  const propertyRepository = AppDataSource.getRepository(Property);
  const categoryRepository = AppDataSource.getRepository(Category);
  const addressRepository = AppDataSource.getRepository(Address);

  const newAddress = addressRepository.create({
    district: property.address.district,
    zipCode: property.address.zipCode,
    number: property.address.number,
    city: property.address.city,
    state: property.address.state,
  });

  await addressRepository.save(newAddress)

  const category = await categoryRepository.findOneBy({
    id: property.categoryId,
  });

  const propertyAlreadyExists = await propertyRepository.find({
    where: {
      address: property.address
    }
  });

  if (propertyAlreadyExists.length > 0) {
    throw new AppError("Propery already exists", 400);
  }

  if(newAddress.state.length > 2 || newAddress.zipCode.length > 8){
    throw new AppError("Invalid state or ZipCode", 400)
  }

  if (!category) {
    throw new AppError("Invalid Category", 404);
  }

  const newProperty = propertyRepository.create({
    value: property.value,
    size: property.size,
    address: newAddress,
    category: category,
  });

  await propertyRepository.save(newProperty);

  return newProperty;
};

export default createPropertyService;
