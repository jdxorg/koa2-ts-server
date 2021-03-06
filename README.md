## `koa2-ts-server`
> Typescript fork of [koa2-kickstarter](https://github.com/umayr/koa2-kickstarter). Wondering why Typescript ? Read [this](http://stackoverflow.com/questions/12694530/what-is-typescript-and-why-would-i-use-it-in-place-of-javascript) post on StackOverflow

### Setup
```bash
  # clone the repository
  λ git clone https://github.com/jdxorg/koa2-ts-server.git
  # change the current directory
  λ cd koa2-ts-server
  # install all dependencies
  λ yarn
  # run the project
  λ yarn start
  # run the project watch
  λ yarn watch
```  

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
  [navicat 下载](https://www.navicat.com.cn/)
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
- 安装redis服务器 [使用方法](https://www.cnblogs.com/guzhanyu/p/8947940.html)
  [redis 下载](https://redis.io/)
  [redisclient 下载](https://github.com/caoxinyu/RedisClient)
```
  手动启动 redis-server.exe redis.windows.conf --maxmemory 200M
  配置到window服务 redis-server --service-install redis.windows-service.conf --loglevel verbose  
```
- 安装mongodb服务器 [使用方法](https://www.cnblogs.com/weschen/p/8213746.html)
  [mongo 下载](https://fastdl.mongodb.org/win32/mongodb-win32-x86_64-2008plus-ssl-4.0.10-signed.msi)
  [NoSQLBooster for MongoDB](https://nosqlbooster.com/downloads)
```
  1、可以在安装目录 例如：C:\mongodb 中手动创建两个空文件夹
  C:\mongodb\data\db
  C:\mongodb\log
  并在C:\mongodb\log下面创建一个空的mongo.log
  2、启动服务器
  λ >cd c:\mongodb\bin
  λ >cd c:\mongodb\bin> mongod --dbpath C:\mongodb\data\db --logpath=C:\mongodb\log\mongodb.log --logappend
  3、连接 使用cmd命令窗口，并进入至c:\mongodb\bin目录，运行命令
  λ >cd c:\mongodb\bin> mongo
  4、将mongodb作为windows服务启动：以上启动服务器只是一次性的，当关闭了命令窗口，服务器即会关闭，可以将mongodb作为windows启动，这样一开机，mongodb服务就已经启动了 
  λ >c:\mongodb\bin> mongod --dbpath C:\mongodb\data\db --logpath=C:\mongodb\log\mongodb.log --logappend --install --serviceName "MongoDB"
  5、使用配置文件启动mongodb服务
  dbpath=C:\mongodb\data\db             # 数据库文件
  logpath=C:\mongodb\log\mongodb.log    # 日志文件
  logappend=true                        # 日志采用追加模式，配置后mongodb日志会追加到现有的日志文件，不会重新创建一个新文件
  journal=true                          # 启用日志文件，默认启用
  quiet=true                            # 这个选项可以过滤掉一些无用的日志信息，若需要调试使用请设置为 false
  port=27017                            # 端口号 默认为 27017
  λ >c:\mongodb\bin> sc create MongoDB binPath= "C:\mongodb\bin\mongod.exe --service --config=C:\mongodb\config\mongodb.conf"
```

### 调试
```bash
  # vscode 调试 
  配置 vscode 调试文件  launch.json 
  {
    // Use IntelliSense to learn about possible attributes.
    // Hover to view descriptions of existing attributes.
    // For more information, visit: https://go.microsoft.com/fwlink/?linkid=830387
    "version": "0.2.0",
    "configurations": [
      {
        "type": "node",
        "request": "launch",
        "name": "Launch Program",
        "program": "${workspaceFolder}\\src\\index.ts",
        "preLaunchTask": "tsc: build - tsconfig.json",
        "outFiles": [
          "${workspaceFolder}/out/**/*.js"
        ],
        "runtimeExecutable": "nodemon", //自动重启 安装nodemon 或者 node-dev
        "restart": true, //在终止 Node.js 后重启会话
        "console": "integratedTerminal", //启动调试目标的位置，这里选择在 vscode 的集成终端输出信息
        "skipFiles": [ //单步调试不进入node_modules
          "${workspaceRoot}/node_modules/**/*.js",
          "<node_internals>/**/*.js"
        ]
      }
    ]
  }
  在launch.json中会使用到一些预定变量，这里说明一下：

  ${workspaceRoot}：VSCode中打开文件夹的路径
  ${workspaceRootFolderName}：VSCode中打开文件夹的路径, 但不包含"/"
  ${file}：当前打开的文件
  ${fileBasename}： 当前打开文件的文件名, 不含扩展名
  ${fileDirname}： 当前打开文件的目录名
  ${fileExtname} 当前打开文件的扩展名
  ${cwd}：当前执行目录

  # browser 调试 
  打开inspector 

