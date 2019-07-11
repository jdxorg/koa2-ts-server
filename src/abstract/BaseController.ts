/*
 * @Description: BaseController
 * @Author: your name
 * @Date: 2019-06-28 14:21:44
 * @LastEditTime: 2019-06-28 14:41:03
 * @LastEditors: Please set LastEditors
 */
import { Context } from 'koa';
export default abstract class BaseController {
  abstract getList(ctx: Context):Promise<void>;
  abstract getListByPage(ctx: Context):Promise<void>;
  abstract add(ctx: Context):Promise<void>;
  abstract modify(ctx: Context):Promise<void>;
  abstract removeById(ctx: Context):Promise<void>;
}