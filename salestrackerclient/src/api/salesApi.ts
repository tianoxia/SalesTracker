import axios from 'axios';
import type { ProductUpdateDto, SalespersonUpdateDto, SaleCreateDto } from '../types/sales';
import type { CommissionReportFilters } from '../types/commission';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5187/api',
});

export const getProducts = async () => {
  const response = await api.get('/products');
  return response.data;
};
export const getProduct = async (id: number) => {
    const response = await api.get(`/products/${id}`);
    return response.data;
};
export const getSalespersons = async () => {
    const response = await api.get('/salespersons');
    return response.data;
};
export const getSalesperson = async (id: number) => {
    const response = await api.get(`/salespersons/${id}`);
    return response.data;
};
export const getCustomers = async () => {
    const response = await api.get(`/customers/`);
    return response.data;
};
export const getSales = async (params: string) => {
    const response = await api.get(`/sales/by-daterange?${params}`);
    return response.data;
}

export const updateProduct = async(
    id: number,
    data: ProductUpdateDto
) => {
    const response = await api.put(`/products/${id}`, data);
    return response.data;
}
export const updateSalesperson = async (
    id: number,
    data: SalespersonUpdateDto
) => {
    const response = await api.put(`/salespersons/${id}`, data);
    return response.data;
};
export const createSale = async(
    data: SaleCreateDto
) => {
    const response = await api.post('/sales', data);
    return response.data;
};
export const getQuarterlyCommissions = async (
    filters: CommissionReportFilters
) => {
    const response = await api.get(`/reports/quarterly-commission/${filters.year}/${filters.quarter}`);
    return response.data;
};