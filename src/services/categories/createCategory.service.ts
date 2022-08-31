import AppDataSource from "../../data-source";
import { Category } from "../../entities/categories.entity";
import { AppError } from "../../errors/AppError";

const createCategoryService = async (name: string): Promise<Category> => {

    const categoryRepository = AppDataSource.getRepository(Category);

    const categories = await categoryRepository.find()

    const categoryAlreadyExists = categories.find((c)=> c.name === name)

    if(categoryAlreadyExists){
        throw new AppError("Category already exists", 400)
    }

    const category = categoryRepository.create({
        name: name
    })
    
    await categoryRepository.save(category)

    return category;
}

export default createCategoryService;

