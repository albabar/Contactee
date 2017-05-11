import moment from 'moment';

export function age(birthday) {
  return moment().diff(moment(birthday, "DD-MM-YYYY"), 'years');
}

export default age;
