import {Entity, Column, PrimaryGeneratedColumn} from "typeorm";

export class BaseEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  createdBy: string;

  @Column()
  createdAt: number;

  @Column({select: false,nullable:true})
  updatedBy?: string;

  @Column({select: false,nullable:true})
  updatedAt?: number;

}