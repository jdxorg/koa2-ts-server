import { randomBytes } from 'crypto';
import * as Redis from 'ioredis';
import { redisConf } from '../../conf';

class RedisStore {
  private redis: Redis.Redis
  
  constructor() {
    this.redis = new Redis(redisConf);
    this.redis.on('connect',()=> {
      console.log('redis connect success') 
    })
  }

  private getID(length: number): string {
    return randomBytes(length).toString('hex');
  }

  public async get(sid: string): Promise<string|null> {
    let data = await this.redis.get(sid);
    return data;
  }
 
  public async set(obj: any, { sid =  this.getID(32), maxAge }: any = {}): Promise<string> {
    try {
      await this.redis.set(sid, obj, 'PX', maxAge)
    } catch (e) {
      console.log(e);
    }
    return sid;
  }

  public async destroy(sid: string): Promise<void> {
    await this.redis.del(sid);
  }

  public async checkLogin(userId: string): Promise<string> {
    const sid = await this.redis.get(userId);
    if (sid) await this.destroy(sid);
    return sid?sid:'';
  }
}

export default RedisStore;
