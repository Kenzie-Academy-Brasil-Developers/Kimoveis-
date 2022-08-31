import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Property } from "./properties.entity";

@Entity("categories")
class Category {

    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column({length: 60, unique: true})
    name: string

    @OneToMany(()=> Property, property=> property.category)
    properties: Property[]
}


export {Category}