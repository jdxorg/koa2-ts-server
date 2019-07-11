import {Entity, Column} from "typeorm";
import { BaseEntity } from './BaseEntity'

@Entity('t_user')
export default class T_User extends BaseEntity {

  @Column()
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
  sex?: number;

  @Column({
    length:100,
    nullable:true 
  })
  userName?: string;

  @Column({
    type:'text',
    nullable:true
  })
  remark?: string

  @Column()
  state: number;

}