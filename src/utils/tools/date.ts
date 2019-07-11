import * as Moment from 'moment';

export const dateFormat = (dateTime: number=Date.now(),fmt: string='YYYY/MM/DD HH:mm:ss.SSS')=> {
  return Moment(dateTime).format(fmt);
}