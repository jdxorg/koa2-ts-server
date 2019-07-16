/*
 * @Description: In T_User_Login_Info Settings Edit
 * @Author: your name
 * @Date: 2019-07-15 11:39:34
 * @LastEditTime: 2019-07-15 14:10:10
 * @LastEditors: Please set LastEditors
 */
import {Entity, Column,PrimaryGeneratedColumn} from "typeorm";

@Entity('t_user_login_info')
export default class T_User_Login_Info {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  user_id: number;

  @Column()
  last_time: string;

  @Column()
  last_ip: string;

  /**
   * @description:操作类型 login/logout 
   * @param {type} 
   * @return: 
   */
  @Column()
  operate: string;

  /**
   * @description: 登录错误次数限制
   * @param {type} 
   * @return: 
   */
  @Column({
    nullable: true,
  })
  error_count?: number;

  /**
   * @description: 总登录错误次数
   * @param {type} 
   * @return: 
   */
  @Column({
    nullable: true,
  })
  error_allct?: number;
  /**
   * @description: 访问次数
   * @param {type} 
   * @return: 
   */
  @Column({
    nullable:true
  })
  visit_ct?: string

  /**
   * @description: 系统类型
   * @param {type} 
   * @return: 
   */
  @Column()
  system_type: number;

}