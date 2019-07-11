import 'reflect-metadata';
import { createConnection } from "typeorm";
import { mysqlConf, mongoConf } from '../conf';
const _PROD_ = process.env.NODE_ENV === 'production'

export const connectMysqlDB = (): void => {
  createConnection({
    type     : 'mysql',
    host     : mysqlConf.host,
    port     : mysqlConf.port,
    username : mysqlConf.username,
    password : mysqlConf.password,
    database : mysqlConf.database,
    entities : [
      "src/entity/mysql/**/*.ts" 
    ],
    synchronize:true,//应用启动时确保你的实体和数据库保持同步
    logging  : _PROD_ ? false : true,
    // logger   : 'simple-console'
  }).then(() => {
    console.log('mysql connect success!')
  }).catch((err) => {
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
    entities : [
      "src/entity/mongo/**/*.ts" 
    ],
    logging  : _PROD_ ? false : true,
  }).then((connect) => {
    console.log('mongo connect success!')
  }).catch((err) => {
    console.log('mongo connect fail!', err)
  })  
}
