import { Context} from 'koa';
import { sysConf as SystemConfig } from '../conf'

const fs = require('fs');
const path = require('path');
const protocol = SystemConfig.get('protocol');
const host = SystemConfig.get('ip');
const port = SystemConfig.get('port');

const uploadfolderpath = path.join(__dirname, '../uploads/images');
export default class UploadController {
  private static upload(file:any): string{
    // 文件将要上传到哪个文件夹下面
    let result = ''
    // formidable 会将上传的文件存储为一个临时文件，现在获取这个文件的目录
    const tempfilepath = file.path
    // 获取文件类型
    const type = file.type
    // 获取文件名，并根据文件名获取扩展名
    let filename = file.name
    let extname = filename.lastIndexOf('.') >= 0 ? filename.slice(filename.lastIndexOf('.') - filename.length) : ''
    // 文件名没有扩展名时候，则从文件类型中取扩展名
    if (extname === '' && type.indexOf('/') >= 0) {
      extname = '.' + type.split('/')[1]
    }
    // 将文件名重新赋值为一个随机数（避免文件重名）
    filename = Math.random().toString().slice(2) + extname
  
    // 构建将要存储的文件的路径
    const filenewpath = path.join(uploadfolderpath, filename)
  
    // 将临时文件保存为正式的文件
    try {
      // 创建可读流
      // const reader = fs.createReadStream(tempfilepath);
      // // 创建可写流
      // const upStream = fs.createWriteStream(filenewpath);
      // // 可读流通过管道写入可写流
      // reader.pipe(upStream);
      //重命名为真是文件
      fs.renameSync(tempfilepath, filenewpath)
      // 保存成功
      console.log('fs.rename done')
      // 拼接url地址
      result = `${protocol+host}:${port}/images/${filename}`
    } catch (err) {
      if (err) {
        // 发生错误
        console.log('fs.rename err')
        result = `${filename} error|save error`
      }
    }
    
    return result;
  }
  /**
   * @description: 上传单个文件
   * @param {type} 
   * @return: 
   */
  public static async uploadFile(ctx: Context) {
    const file = ctx.request.files.file;
    const result = UploadController.upload(file);
    ctx.json({data:result});
  }

  /**
   * @description: 上传多个文件
   * @param {type} 
   * @return: 
   */
  public static async uploadFiles(ctx: Context) {
    const files = ctx.request.files.file;
    let result = ''
    for(let file of files){
      result = UploadController.upload(files);
    }
    ctx.json({data:result});
  }
}
