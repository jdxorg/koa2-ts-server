/*
 * @Author: dexiaojiang 289608944@qq.com
 * @Description: In User Settings Edit
 * @Date: 2019-08-23 18:22:08
 * @LastEditTime: 2019-08-23 18:24:08
 * @LastEditors: dexiaojiang 289608944@qq.com
 */
import {Entity, Column, PrimaryGeneratedColumn} from "typeorm";

@Entity('t_dictionary')
export default class T_Dictionary {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  key: string;

  @Column({
    nullable:true
  })
  value: string;

  @Column({
    nullable: true
  })
  mark: string
}