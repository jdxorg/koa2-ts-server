/*
 * @Author: dexiaojiang 289608944@qq.com
 * @Description: In User Settings Edit
 * @Date: 2019-08-27 10:00:43
 * @LastEditTime: 2019-08-27 16:17:35
 * @LastEditors: dexiaojiang 289608944@qq.com
 */
import { Context } from 'koa';
import { DBHelper } from '../../utils/database/dbHelper';
import Banner from '../../entity/mongo/Banner';
import Helper from '../common/Helper'
import { 
  ADD_SUCCESS,
  ADD_FAIL,
  MODIFY_SUCCESS,
  MODIFY_FAIL,
  DELETE_SUCCESS,
  DELETE_FAIL,
  NO_RECORD
} from '../../constants/message';

const tableName = 'banner'
export default class WeiXinController {

  public static async getMobileHome(ctx: Context): Promise<any> {
    const params = ctx.getParams.params;
    try {
      let bannerOptions = {};
      let navbarOptions = {};
      if(params&&params.bannerName){
        bannerOptions = {name: `like %${params.bannerName}%`}
      }
      if(params&&params.navbarName){
        navbarOptions = {name: `like %${params.navbarName}%`}
      }
      const banners = await DBHelper.mongoRespository('banner').find(bannerOptions)

      const navbars = await DBHelper.mongoRespository('navbars').find(navbarOptions)
      ctx.json({
        data:{
          banners,
          navbars
        }
      })
    } catch (error) {
      console.log('getMobileHome error',error)
    }
  }

  public static async save(ctx: Context): Promise<any> {
    let data = ctx.getParams.params;
    const model = new Banner()
    model.name = data.name
    model.image = data.image
    model.description = data.description
    try {
      const result = await DBHelper.mongoManager().save(model);
      ctx.json({data:result,msg:MODIFY_SUCCESS});
    } catch (error) {
      ctx.json({data:null,msg:MODIFY_FAIL});
    }
  }

  public static async update(ctx: Context) {
    let params = ctx.params
    let data = ctx.getParams.params
    const model = await DBHelper.mongoRespository(tableName).findOne({_id:DBHelper.getObjectId(params.id) }) as Banner;
    if(model){
      model.name = data.name 
      model.image = data.image
      model.description = data.description
      try {
        const result = await DBHelper.mongoManager().save(model)
        ctx.json({data:result,msg:MODIFY_SUCCESS});
      } catch (error) {
        ctx.json({data:null,msg:error.message});
      }
    }
  }

  public static async remove(ctx: Context): Promise<void> {
    let params = ctx.params
    try {
      const result = await DBHelper.mongoRespository(tableName).deleteOne({_id: DBHelper.getObjectId(params.id) })
      ctx.json({
        data:params.id,
        msg:DELETE_SUCCESS
      })
    } catch (error) {
      ctx.json({
        data:null,
        msg:error.message
      })
    }
  } 

  public static async query(ctx: Context): Promise<any> {
    let params = ctx.params
    try {
      const result = await Helper.getById(params.id,tableName)
      ctx.json({
        data:result
      })
    } catch (error) {
      ctx.json({
        data:null,
        msg:error.message
      })
    }
  }
}