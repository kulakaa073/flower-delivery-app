import axios from 'axios';
import type { AxiosResponse } from 'axios';
import type { ApiResponse } from '../types';

const axiosInstance = axios.create({
  baseURL: 'https://flower-delivery-app-back.onrender.com/api/',
});

axiosInstance.interceptors.response.use(
  <T>(response: AxiosResponse<ApiResponse<T>>) => {
    return response.data.data;
  }
);

interface TransformedAxios {
  get<T>(url: string): Promise<T>;
  post<T, D = unknown>(url: string, data?: D): Promise<T>;
  patch<T, D = unknown>(url: string, data?: D): Promise<T>;
}

const api = axiosInstance as unknown as TransformedAxios;

export default api;
