import {Entity, Column,PrimaryGeneratedColumn, ManyToOne} from "typeorm";
import T_User from './t_user';
import T_Role from './t_role';

@Entity('t_user_role')
export default class T_User_Role {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: number;

  @Column()
  roleId: number;
  
  @ManyToOne(type => T_User, user=> user.relations)
  user: T_User;

  @ManyToOne(type => T_Role, role=> role.relations)
  role: T_Role;
}