import sysConf from './sys.conf';

export {
  sysConf
};

export const redisConf = {
  port: 6379,          // Redis port
  host: '127.0.0.1',   // Redis host
  family: 4,           // 4 (IPv4) or 6 (IPv6)
  db: 0,
};

export const mysqlConf = {
  port: 3306, 
  host:'127.0.0.1',
  username:'root',
  password:'123456',
  database:'db_account',
};

export const mongoConf = {
  port: 27017, 
  host:'127.0.0.1',
  username:'root',
  password:'123456',
  database:'db_account',
};