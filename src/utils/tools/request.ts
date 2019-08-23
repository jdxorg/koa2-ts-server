/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-23 16:46:57
 * @LastEditTime: 2019-08-23 17:33:22
 * @LastEditors: Please set LastEditors
 */

import axios,{ AxiosRequestConfig,AxiosResponse } from 'axios'
import { WEIXIN_SERVER } from '../../constants';
const qs = require('qs')

export  {
  AxiosRequestConfig
} 
export default class HttpRequest {

  static sendRequest(options: AxiosRequestConfig): Promise<any> {
   const {
     method = 'GET',
     baseURL = WEIXIN_SERVER,
     timeout = 10000,
     data,
   } = options
   
   if( method === 'GET' ){
     options.params = data
   }else{
     options.data = data
   }
    // 注意**Promise**使用(Promise首字母大写)
    return new Promise((resolve, reject) => {
      axios(options).then((res) => {
        resolve(res)
      }).catch((response) => {
        this.error(response)
        reject(response)
      })
    })
  }

  // 封装数据返回失败提示函数---------------------------------------------------------------------------
  static error(response: AxiosResponse) {
    // 隐藏loading
    // 如果http状态码正常，则直接返回数据
    if (response && (response.status === 200 || response.status === 304 || response.status === 400)) {
      // 如果不需要除了data之外的数据，可以直接 return response.data
      return response
    } else {
      console.log('axios error',response)
    }
  }

}