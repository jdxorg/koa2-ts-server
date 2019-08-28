/*
 * @Author: dexiaojiang 289608944@qq.com
 * @Description: In User Settings Edit
 * @Date: 2019-08-27 10:18:58
 * @LastEditTime: 2019-08-27 10:22:44
 * @LastEditors: dexiaojiang 289608944@qq.com
 */
import {Entity, Column, ObjectIdColumn} from "typeorm";

@Entity('navbars')
export default class Navbar {

  @ObjectIdColumn({ unique: true })
  id: string;

  @Column()
  name?: string;

  @Column()
  image?: string;

  @Column()
  description?: string
}