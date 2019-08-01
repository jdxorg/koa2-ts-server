import {Entity, Column, OneToMany} from "typeorm";
import { BaseEntity } from './BaseEntity'
import T_User_Role from "./t_user_role";

@Entity('t_user')
export default class T_User extends BaseEntity {

  @Column()
  ///登陆账号
  loginName: string;

  @Column()
  loginPwd: string;

  @Column({
    length:20,
    nullable:true
  })
  mobile?: string;

  @Column({
    nullable:true
  })
  email?: string;

  @Column({
    nullable:true
  })
  gender?: number;

  @Column({
    length:100,
    nullable:true 
  })
  ///用户姓名
  userName?: string;

  @Column({
    length:100,
    nullable:true 
  })
  ///昵称
  nickName?: string;

  @Column({
    type:'text',
    nullable:true
  })
  remark?: string

  @Column()
  state: number;

  @Column()
  age: number;

  @Column({
    nullable:true 
  })
  address?: string;

  @Column({
    nullable:true
  })
  addressCode?: string;

  @Column({
    nullable:true
  })
  familyAddress?: string;

  @Column({
    nullable:true 
  })
  ///头像
  avatar?: string;

  @Column({
    nullable: true,
  })
  visit?: string;

  @OneToMany(() => T_User_Role, relation=> relation.user)
  relations: T_User_Role[];
}