/*
 * @Description: 
    jwt_encode(payload, key, algorithm, options)
    jwt_decode(token, key, noVerify, algorithm)
    //algorithm = HS256, 
                  HS384, 
                  HS512,
                  RS256.
 * @Author: your name
 * @Date: 2019-07-11 14:10:03
 * @LastEditTime: 2019-07-16 11:27:43
 * @LastEditors: Please set LastEditors
 */
const jwt = require('jwt-simple');

interface IPayloadOptions {
  [key: string]: any;
  iss: any, //token(Issuer) 签发者
  sub?: string, //jwt(Subject)所面向的用户
  aud?: string, //token(Audience) 收件人
  exp?: number, //token (Expiration Time)的过期时间，一般当前时间加期限
  nbf?: any,  //(Not Before)验证该时间之前token 无效
  iat?: number, //token(Issued At) 签发时间
  jti?: string, //jwt (JWT ID)的唯一身份标识，主要用来作为一次性token,从而回避重放攻击
}

const alg = 'HS256';
/**
 * @description: 加密token
 * @param {type} 
 * @return: 
 */
export const encode = (payload: IPayloadOptions, secret: string|Buffer,algorithm: string = alg) => {
  const token = jwt.encode(payload,secret,algorithm);
  return token;
}

/**
 * @description: 解密token
 * @param {type} 
 * @return: 
 */
export const decode = (token: string, secret: string|Buffer, noVerify: boolean = false,algorithm: string = alg) => {
  const decoded = jwt.decode(token,secret,noVerify,algorithm);
  return decoded.iss;
}
