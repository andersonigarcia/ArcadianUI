import { date } from 'quasar'
const { formatDate } = date

const self = {
  formatDate: formatDate,
  isoDatetime: (v) => (v) ? formatDate(new Date(v), 'YYYY-MM-DDTHH:mm') : '',
  isoDate: (v) => (v) ? formatDate(new Date(v), 'YYYY-MM-DD') : '',
  dmy2iso: (v) => (v) ? v.substring(6, 10) + '-' + v.substring(3, 5) + '-' + v.substring(0, 2) : '',
  ymd2iso: (v) => (v) ? v.substring(0, 4) + '-' + v.substring(5, 7) + '-' + v.substring(8, 10) : '',
  dmyhm: (v) => (v) ? formatDate(new Date(v), 'DD/MM/YYYY HH:mm') : '',
  dmy: (v) => (v) ? formatDate(new Date(v), 'DD/MM/YYYY') : '',
  ymd: (v) => (v) ? formatDate(new Date(v), 'YYYY/MM/DD') : '',
  ddmm: (v) => (v) ? formatDate(new Date(v), 'DD/MM') : '',
  hhmm: (v) => (v) ? formatDate(new Date(v), 'HH:mm') : '',
  isValid: (v) => date.isValid(v),
  datetime: (d, t) => self.isoDate(d) + 'T' + self.hhmm(t)
}

export default self
