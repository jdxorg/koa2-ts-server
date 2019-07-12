import 'reflect-metadata';
import { createConnection } from "typeorm";
import { mysqlConf, mongoConf } from '../conf';
import { Entities } from '../entity/mysql';
import { MongoEntities } from '../entity/mongo';
import { MongoEntities } from '../entity/mongo/index';

const _PROD_ = process.env.NODE_ENV === 'production'

export const connectMysqlDB = (): void => {
  createConnection({
    type     : 'mysql',
    host     : mysqlConf.host,
    port     : mysqlConf.port,
    username : mysqlConf.username,
    password : mysqlConf.password,
    database : mysqlConf.database,
    entities : Entities,
    synchronize:true,//应用启动时确保你的实体和数据库保持同步
    logging  : _PROD_ ? false : true,
    // logger   : 'simple-console'
  }).then(() => {
    console.log('mysql connect success!')
  }).catch((err: any) => {
    console.log('mysql connect fail!', err)
  })  
}

export const connectMongo = (): void => {
  createConnection({
    name     : 'mongo',
    type     : 'mongodb',
    host     : mongoConf.host,
    port     : mongoConf.port,
    username : mongoConf.username,
    password : mongoConf.password,
    database : mongoConf.database,
    entities:MongoEntities,
    // entities : [
    //   "src/entity/mongo/**/*.ts"  //这种配置形式在调试模式下无法正确连接数据库
    // ],
    synchronize:true,//应用启动时确保你的实体和数据库保持同步
    logging  : _PROD_ ? false : true,
  }).then(() => {
    console.log('mongo connect success!')
  }).catch((err: any) => {
    console.log('mongo connect fail!', err)
  })  
}
