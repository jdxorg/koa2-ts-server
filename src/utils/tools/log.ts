import * as debug from 'debug';
import { sysConf } from '../../conf/index';

const _DEV_ = sysConf.get('env') === 'development';
const log = debug('log:info');
log.enabled = _DEV_;

export {
  _DEV_,
  log
};