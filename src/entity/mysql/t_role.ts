import {Entity, Column, OneToMany} from "typeorm";
import { BaseEntity } from "./BaseEntity";
import T_User_Role from './t_user_role';

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

  /// 0=正常 1=无效
  @Column({
    default:0,
  })
  state: number;

  @OneToMany(() => T_User_Role, relation => relation.role)
  relations: T_User_Role[];
}