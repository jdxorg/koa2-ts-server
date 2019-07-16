
import * as Koa from 'koa';
import * as KoaLogger from 'koa-logger';
import Catch from './middleware/catch';
import { sysConf } from './conf/index';
import Middlewares from './middleware/index';
import { connectMysqlDB, connectMongo } from './utils/database/db';
import { _DEV_,log } from './utils';

class Application {
  private app: Koa;
  constructor(){
    this.app = new Koa();
    this.init()
  }

  private init (){
    if( _DEV_ ){
      this.app.use(KoaLogger());
    }
    this.app.use(Catch);
    this.app.keys = ['APP_Keys']; // set app keys
		// this.app.use(async (ctx: Koa.Context, next: () => Promise<any>) => {
		// 	const path = ctx.request.path
		// 	if(path === '/') {
		// 		ctx.body = 'Welcome to koa-graphql server.'
		// 	}
		// 	await next()
		// 	// ctx.set('X-Powered-By', 'Keefe');
    // })
    
    Middlewares(this.app);

    this.start();
  }

  private start(){
    const port = sysConf.get('port')
    // log(`current environment: ${sysConf.get('env')},Koa server has started, running with: http://127.0.0.1:${port}. `)
    this.app.listen(port,() => {
      connectMysqlDB() // db start after server running
      connectMongo() // connect mongodb
    });
  }
}

export default new Application()