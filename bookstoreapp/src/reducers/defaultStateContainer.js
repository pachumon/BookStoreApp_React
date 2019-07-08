import moment from 'moment'

const defaultBookInfo = {
    id: 0,
    title: '',
    author: '',
    published: moment().format('YYYY'),
    category: ''
  };


export {defaultBookInfo};