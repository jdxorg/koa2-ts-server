import * as convict from 'convict';
import * as debug from 'debug';
import * as fs from 'fs';

const conf = convict({
  env: {
    doc: 'The application environment.',
    format: ['production', 'development', 'test'],
    // tslint:disable-next-line:object-literal-sort-keys
    default: 'development',
    env: 'NODE_ENV',
  },
  ip: {
    doc: 'The ip address to bind.',
    format: 'ipaddress',
    // tslint:disable-next-line:object-literal-sort-keys
    default: '127.0.0.1',
    env: 'IP_ADDRESS',
  },
  port: {
    doc: 'The port to bind.',
    format: 'port',
    // tslint:disable-next-line:object-literal-sort-keys
    default: 4000,
    env: 'PORT',
  },
});
const d = debug('kickstarter:conf');
const env = conf.get('env');
try {
  const path = `${__dirname}/${env}.json`;

  d('trying to access %s', path);
  fs.accessSync(path, fs.constants.F_OK);

  conf.loadFile(path);
} catch (error) {
  d('file doesn\'t exist, loading defaults');
}

conf.validate({ allowed: 'strict' });

export default conf;
