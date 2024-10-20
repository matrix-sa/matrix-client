import moment from 'moment'

export const DateFormat = date => {
  return moment(date).format('hh:mm - M.D.YYYY')
}
