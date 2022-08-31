import AppDataSource from "../../data-source";
import { Category } from "../../entities/categories.entity";
import { AppError } from "../../errors/AppError";

const listImovelWhitCategoryService = async (id: string): Promise<Category> => {
  const categoryRepository = AppDataSource.getRepository(Category);

  const category = await categoryRepository.findOne({
    where: {
      id: id,
    },
    relations: {
      properties: true,
    },
  });

  if (!category) {
    throw new AppError("Invalide Id", 404);
  }

  return category;
};

export default listImovelWhitCategoryService;
