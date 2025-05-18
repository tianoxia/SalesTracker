import React, { useState, useEffect } from 'react';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import {
    getProducts,
    getCustomers,
    getSalespersons,
    createSale
} from '../api/salesApi';
import { formatDateForDisplay, parseDateForApi } from '../utils/dateUtils';
import type { Product, Customer, Salesperson } from '../types/sales';
import './SalesTracker.css';

export default function NewSale() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        productId: '',
        customerId: '',
        salespersonId: '',
        saleDate: formatDateForDisplay(new Date().toISOString())
    });
    const [options, setOptions] = useState({
        products: [] as Product[],
        customers: [] as Customer[],
        salespersons: [] as Salesperson[]
    });
    const [loading, setLoading] = useState({
        products: true,
        customers: true,
        salespersons: true
    });
    const [error, setError] = useState('');
    // Update mutation
    const mutation = useMutation({
        mutationFn: () => createSale({
            productId: parseInt(formData.productId),
            customerId: parseInt(formData.customerId),
            salespersonId: parseInt(formData.salespersonId),
            saleDate: parseDateForApi(formData.saleDate) ?? undefined
        }),
        onSuccess: () => navigate('/sales')
    });
    useEffect(() => {
        const fetchOptions = async () => {
            try {
                const [products, customers, salespersons] = await Promise.all([
                    getProducts(),
                    getCustomers(),
                    getSalespersons()
                ]);

                setOptions({
                    products,
                    customers,
                    salespersons
                });

                setLoading({
                    products: false,
                    customers: false,
                    salespersons: false
                });
            } catch (err) {
                setError('Failed to load required data');
                console.error(err);
            }
        };
        fetchOptions();
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };
    const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        let formattedValue = value.replace(/\D/g, '');
        if (formattedValue.length > 2) {
            formattedValue = formattedValue.replace(/^(\d{2})/, '$1/');
        }
        if (formattedValue.length > 5) {
            formattedValue = formattedValue.replace(/^(\d{2}\/\d{2})/, '$1/');
        }
        formattedValue = formattedValue.substring(0, 10);

        setFormData(prev => ({
            ...prev,
            [name]: formattedValue
        }));
    };
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        mutation.mutate();
    };
    
    if (error) {
        return <div className="error-text">{error}</div>;
    }

    if (loading.products || loading.customers || loading.salespersons) {
        return <div>Loading form data...</div>;
    }

    return (
        <div className="form-container">
            <h1 className="form-header">Create New Sale</h1>

            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Product</label>
                    <select
                        name="productId"
                        value={formData.productId}
                        onChange={handleChange}
                        required>
                        <option value="">Select a product</option>
                        {options.products.map(product => (
                            <option key={product.id} value={product.id}>
                                {product.name}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="form-group">
                    <label>Customer</label>
                    <select
                        name="customerId"
                        value={formData.customerId}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Select a customer</option>
                        {options.customers.map(customer => (
                            <option key={customer.id} value={customer.id}>
                                {customer.firstName} {customer.lastName}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="form-group">
                    <label>Salesperson</label>
                    <select
                        name="salespersonId"
                        value={formData.salespersonId}
                        onChange={handleChange}
                        className="w-full border rounded px-3 py-2"
                        required
                    >
                        <option value="">Select a salesperson</option>
                        {options.salespersons.map(salesperson => (
                            <option key={salesperson.id} value={salesperson.id}>
                                {salesperson.firstName} {salesperson.lastName}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="form-group">
                    <label>Sale Date (MM/DD/YYYY)</label>
                    <input
                        type="text"
                        name="saleDate"
                        value={formData.saleDate}
                        onChange={handleDateChange}
                        required />
                </div>

                <div className="form-actions">
                    <button
                        type="button"
                        onClick={() => navigate('/sales')}
                        className="btn btn-secondary">
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="btn btn-primary">
                        Create Sale
                    </button>
                </div>
            </form>
        </div>
    );
}
