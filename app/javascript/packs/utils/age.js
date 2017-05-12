import moment from 'moment';

export function age(birthday) {
  return moment().diff(moment(birthday, 'YYYY-MM-DD'), 'years');
}

export default age;
