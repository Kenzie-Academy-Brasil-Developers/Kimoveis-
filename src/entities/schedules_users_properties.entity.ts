import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Property } from "./properties.entity";
import { User } from "./user.entity";

@Entity("schedules")
class SchedulesUsersProperties {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ type: "date" })
  date: Date;

  @Column({ type: "time" })
  hour: string;

  @ManyToOne(() => Property)
  @JoinColumn({ name: "propertyId" })
  property: Property | string;

  @ManyToOne(() => User, { eager: true })
  @JoinColumn({ name: "userId" })
  user: User;
}

export { SchedulesUsersProperties };
