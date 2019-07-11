import {Entity, Column} from "typeorm";
import { BaseEntity } from "./BaseEntity";

@Entity('t_role')
export default class T_Role extends BaseEntity {
  @Column()
  roleName: string;

  @Column()
  roleType: number;

  @Column({
    type:'text',
    nullable:true
  })
  roleDesc?: string;

  @Column()
  state: number;
}