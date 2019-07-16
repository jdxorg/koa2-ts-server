import { 
  getManager,
  getRepository, 
  getMongoManager, 
  getMongoRepository, 
  FindManyOptions, 
  EntityManager,
  MongoEntityManager
} from 'typeorm';

interface IManyOptions {
  offset: number,
  limit: number,
  order?: object,
  where?: object
}
export class DBHelper {

  
  public static respository = getRepository;

  constructor(){
  } 
  public static manager(): EntityManager{
    return getManager();
  };

  public static mongoManager(): MongoEntityManager{
    return getMongoManager('mongo');
  }

  public static mongoRespository(arg: string) {
    return getMongoRepository(arg,'mongo');
  };

  public static getManyOptions<T>(params: IManyOptions): FindManyOptions<T>{
    const options:FindManyOptions<T> = {
      skip: params.offset,
      take: params.limit,
      order: params.order||{},
      where: params.where||{},
    }
    return options;
  }
}