import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn, OneToMany, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Exclude } from 'class-transformer';
import { SchedulesUsersProperties } from './schedules_users_properties.entity';

@Entity('users')
class User {

    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column({ length: 60 })
    name: string

    @Column({ unique: true, length: 60 })
    email: string

    @Column({ length: 120 })
    @Exclude()
    password: string

    @Column()
    isAdm: boolean

    @Column({ default: true })
    isActive: boolean

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date

    @OneToMany(()=> SchedulesUsersProperties, schedules => schedules.user)
    schedules: SchedulesUsersProperties[]
}

export { User }