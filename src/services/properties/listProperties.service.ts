import AppDataSource from "../../data-source";
import { Property } from "../../entities/properties.entity";

const listPropertiesService = async (): Promise<Property[]> => {
    const propertiesRepository = AppDataSource.getRepository(Property)
    const properties = await propertiesRepository.find()
    return properties
}


export default listPropertiesService;