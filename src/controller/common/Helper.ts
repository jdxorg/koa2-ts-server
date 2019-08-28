import { DBHelper } from '../../utils/database/dbHelper';

export default class Helper {

  /**
   * @description: 
   * @param {type} 
   * @return: 
   */
  static async getById(id: string = '',tableName: string) {
    const api = await DBHelper.mongoRespository(tableName).findOne({_id: DBHelper.getObjectId(id) });
    return api;
  }
}