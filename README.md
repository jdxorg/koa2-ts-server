## `koa2-ts-server`
> Typescript fork of [koa2-kickstarter](https://github.com/umayr/koa2-kickstarter). Wondering why Typescript ? Read [this](http://stackoverflow.com/questions/12694530/what-is-typescript-and-why-would-i-use-it-in-place-of-javascript) post on StackOverflow

### Setup
```bash
  # clone the repository
  λ git clone https://github.com/mohuk/koa2-ts-init
  # change the current directory
  λ cd koa2-ts-init
  # install all dependencies
  λ yarn
  # run the project
  λ npm run start
```

### Structure
```bash
├── README.md           # you're here
├── bin                 # folder that bootstraps the application
├── src                 # contains source files
│   ├── conf            # wraps configurations files
│   ├── controller      # contains all controllers in the application
│   ├── constrants      # contains all constant in the application
│   ├── middleware      # folder with all middlewares
│   ├── route           # wraps all the routes and exports a single composed middleware
│   |── service         # contains all the service logic
    |—— entity          # entity
    |—— models          # models
    |—— core            # system core 
└── test                # unit tests
```

**Suggestion:** Every folder name is _singular_ like `route`, `middleware` instead of `routes`, `middlewares`. If you want to add more folders as per your need, make sure they should be singular too (for e.g. `util`, `helper` etc) only for the sake of consistency.

### Included

- [Koa](https://github.com/koajs/koa) Well, duh.
- [Koa Router](https://github.com/alexmingoia/koa-router) For routing and all.
- [Debug](https://github.com/visionmedia/debug) Debug messages in the development environment.
- [Ava](https://github.com/avajs/ava) For unit tests.
- [Boom](https://github.com/hapijs/boom) HTTP Errors.
- [Convict](https://github.com/mozilla/node-convict) Configuration management.
- [Typescript](https://github.com/Microsoft/TypeScript) Typed superset of Javascript. Supports ES6/ES7 features.
- [TSLint](https://github.com/palantir/tslint) Linting purposes.
- [Nodemon](https://github.com/remy/nodemon) Restart the server automatically (hot-reloading).

And many more small packages.

### Scripts

- `npm start` - simply starts the server
- `npm test` - execute all unit tests
- `npm run lint` - lints all the files in `src/` folder
- `npm run lint:fix` - fixes all the possible linting errors
- `npm run watch` - starts the server with hot-reloading

**Suggestion:** To turn on debug messages, set `DEBUG` environment variable to `kickstarter:*`

### Docker

`Dockerfile` for the project has been packaged. Running instructions are standard and can be found below:

#### Build
```bash
λ docker build -t koa .
```

#### Run
```bash
# you can set the DEBUG environment variable through -e DEBUG={value} 
λ docker run -dp 4000:4000 koa
```

### 搭建环境
- 安装mysql数据库 
  [mysql 下载](https://dev.mysql.com/downloads/mysql/)
```
1、配置系统环境变量
  变量名：MYSQL_HOME 
  变量值: 安装路径（例如：E:\mysql-5.7.20-winx64）
  在path中添加%MYSQL_HOME%\bin
2、生成data文件
  以管理员身份运行cmd
  进入E:\python\mysql\mysql-8.0.12-winx64\bin>下
  执行命令：mysqld --initialize-insecure --user=mysql  在E:\python\mysql\mysql-8.0.12-winx64\bin目录下生成data目录
3、安装MySQL
  继续执行命令：mysqld -install
4、启动服务
  net start mysql
5、登录mysql
  登录mysql:(因为之前没设置密码，所以密码为空，不用输入密码，直接回车即可）
  E:\mysql-5.7.20-winx64\bin>mysql -u root -p
  Enter password: ******
6、查询密码
  查询用户密码命令：mysql> select host,user,authentication_string from mysql.user;
7、设置（或修改）root用户密码
  mysql> update mysql.user set authentication_string=password("123456") where user
  ="root";   #password("123456"),此处引号中的内容是密码，自己可以随便设置
  Query OK, 1 row affected, 1 warning (0.00 sec)
  Rows matched: 1  Changed: 1  Warnings: 1
  mysql> flush privileges;  #作用：相当于保存，执行此命令后，设置才生效，若不执行，还是之前的密码不变
  Query OK, 0 rows affected (0.01 sec)
8、退出mysql
  quit
```
  [navicat 下载](https://www.navicat.com.cn/)
- 安装redis服务器 
  [redis 下载](https://redis.io/)
  [redisclient 下载](https://github.com/caoxinyu/RedisClient)

- 安装mongodb服务器 
  [mongo 下载](https://fastdl.mongodb.org/win32/mongodb-win32-x86_64-2008plus-ssl-4.0.10-signed.msi)

