
import * as debug from 'debug';
import * as Koa from 'koa';
import * as KoaLogger from 'koa-logger';
import Catch from './middleware/catch';
import { sysConf } from './conf/index';
import { connectMysqlDB, connectMongo } from './utils/db';
import Middlewares from './middleware/index';
const _DEV_ = process.env.NODE_ENV === 'development'

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
		this.app.use(async (ctx: Koa.Context, next: () => Promise<any>) => {
			const path = ctx.request.path
			console.log(`path: ${path}`)
			if(path === '/') {
				ctx.body = 'Welcome to koa-graphql server.'
			}
			await next()
			// ctx.set('X-Powered-By', 'Keefe');
    })
    
    Middlewares(this.app);

    this.start();
  }

  private start(){
    const d = debug('kickstarter:root');
    const port = sysConf.get('port')
    d('current environment: %s', sysConf.get('env'));
    d('server started at port: %d', port);
    this.app.listen(port,() => {
      console.log(`Koa server has started, running with: http://127.0.0.1:${port}. `)
      connectMysqlDB() // db start after server running
      connectMongo() // connect mongodb
    });
  }
}

export default new Application()