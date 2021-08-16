import moment from 'moment';

export const compareTimes = (timeA: string, timeB: string) => {
  //timae A is the currnet time
  const firstMoment = moment(timeA, 'h:m a');
  const secMoment = moment(timeB, 'h:m a');

  return firstMoment.isBefore(secMoment);
};
