// import fs from 'fs'
// import path from 'path'

// const publicKey = fs.readFileSync(path.join(__dirname, '../../publicKey.pub'))

const _PROD_ = process.env.NODE_ENV === 'production'

// JWT Secret Key, is very very very classified
export const JWT_SECRET = 'koa-grapqhql-secret'

export const JWT_TOKEN = 'JWT_TOKEN'
// JWT Key, indicate current user
export const CUR_USER = 'CUR_USER'


// JWT EXP_TIME
export const EXP_TIME = _PROD_ ?  1000 * 60 * 60 : 1000 * 60 * 60 * 2

// 0-PC 1-IOS 2-ANDROIRD 3-公众号 4-后管系统
export enum SYSTEM_PLATFORM {
  PC,
  IOS,
  ANDROIRD,
  WEBCHAT_COMMON,
  ADMIN,
}

// don't need auth url
export const NO_AUTH_URLS = [
  [/\/account\/login/,  /^post$/i],
]