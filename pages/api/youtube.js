import axios from 'axios';

export const KEY = 'AIzaSyBz9MjMowqr-mrzdNVn8j4HRAwUh6Sb72A';

export default axios.create({
  baseURL: 'https://www.googleapis.com/youtube/v3/',
  params: {
    part: 'snippet',
    maxResults: 10,
    key: KEY
  }
})

export const mostPopular = axios.create({
  baseURL: 'https://www.googleapis.com/youtube/v3/videos?',
  params: {
    chart:'mostPopular',
    part: 'snippet,statistics',
    maxResults: 10,
    regionCode:'ua',
    key: KEY
  }
})

