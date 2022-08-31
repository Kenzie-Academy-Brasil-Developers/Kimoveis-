import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Address } from "./adresses.entity";
import { Category } from "./categories.entity";
import { SchedulesUsersProperties } from "./schedules_users_properties.entity";

@Entity("properties")
class Property {

    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column({default: false})
    sold: boolean

    @Column("decimal", { precision: 12, scale: 2 })
    value: number

    @Column({ type: 'integer' })
    size: number

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date

    @OneToOne(()=> Address, {eager: true}) @JoinColumn({name: "addressId"})
    address: Address

    @ManyToOne(()=> Category, {eager: true}) @JoinColumn({name: "categoryId"})
    category: Category

    @OneToMany(()=> SchedulesUsersProperties, schedules => schedules.property)
    schedules: SchedulesUsersProperties[]
}

export {Property}