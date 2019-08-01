import {Entity, Column, PrimaryGeneratedColumn} from "typeorm";

export class BaseEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    nullable:true
  })
  createdBy?: string;

  @Column({
    type:'bigint',
    nullable:true
  })
  createdAt?: number;

  @Column({
    nullable:true
  })
  updatedBy?: string;

  @Column({
    type:'bigint',
    nullable:true
  })
  updatedAt?: number;

}