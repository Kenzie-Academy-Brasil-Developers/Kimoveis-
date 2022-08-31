import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Property } from "./properties.entity";

@Entity("addresses")
class Address {

  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ length: 60 })
  district: string;

  @Column({ length: 8 })
  zipCode: string;

  @Column({ length: 5 })
  number?: string;

  @Column({ length: 60 })
  city: string;

  @Column({ length: 60 })
  state: string;

  @OneToOne(()=> Property, property=> property.address)
  property: Property
}

export { Address };
