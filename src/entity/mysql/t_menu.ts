import {Entity, Column} from "typeorm";
import { BaseEntity } from "./BaseEntity";

@Entity('t_menu')
export default class T_Menu extends BaseEntity {
  @Column({
    nullable:true,
  })
  parentid: number;

  @Column()
  name: string;

  @Column({
    nullable:true
  })
  zh?: string;

  @Column({
    nullable:true
  })
  icon?: string;

  @Column({
    nullable:true
  })
  route?: string;

  @Column({
    default:1,
  })
  display: number;
}