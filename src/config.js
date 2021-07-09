import axios from 'axios';

export const config = {
  common: {},
  search: {
    baseURL: 'https://www.omdbapi.com/',
    api_key: '8523cbb8',
    options: {
      s: {
          type: String,
          required: true
      },
      type: {
        type: String,
        required: false
      },
      page: {
        type: Number,
        required: false
      }
    }
  }
},

HTTP = axios.create({
  baseURL: 'https://www.omdbapi.com/',
  method: 'GET',
  params: {
   apikey: '8523cbb8',
    s: '',
    type: '',
    page: 1,
    y: ''
  }
})

///HTTP.defaults.params = {apikey: '8523cbb8'}
