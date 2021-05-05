import axios, { AxiosInstance } from 'axios';

export default class AxiosService {
  static readonly instance: AxiosInstance = axios.create({
    baseURL: 'http://localhost:3080',
    timeout: 10000000,
  });
}
