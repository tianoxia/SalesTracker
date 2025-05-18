import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery, useMutation } from '@tanstack/react-query';
import { getProduct, updateProduct } from '../api/salesApi';
import type { Product } from '../types/sales';
import './SalesTracker.css';

export default function EditProduct() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [formData, setFormData] = useState<Product>({
        id: 0,
        name: '',
        manufacturer: '',
        style: '',
        purchasePrice: 0,
        salePrice: 0,
        qtyOnHand: 0,
        commissionPercentage: 0
    });

    // Fetch product data
    const { data: product, isLoading } = useQuery({
        queryKey: ['product', id],
        queryFn: () => getProduct(Number(id))
    });

    // Update mutation
    const mutation = useMutation({
        mutationFn: () => updateProduct(Number(id), formData),
        onSuccess: () => navigate('/products')
    });

    // Initialize form when data loads
    useEffect(() => {
        if (product) {
            setFormData({
                id: product.id,
                name: product.name,
                manufacturer: product.manufacturer,
                style: product.style,
                purchasePrice: product.purchasePrice,
                salePrice: product.salePrice,
                qtyOnHand: product.qtyOnHand,
                commissionPercentage: product.commissionPercentage
            });
        }
    }, [product]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        mutation.mutate();
    };

    if (isLoading) return <div className="loading">Loading product data...</div>;

    return (
        <div className="form-container">
            <div className="flex justify-between items-center mb-6">
                <h1 className="form-header">Edit Product</h1>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="form-group">
                    <label>Product Name</label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label>Manufacture</label>
                    <input
                        type="text"
                        name="manufacturer"
                        value={formData.manufacturer}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Style</label>
                    <input
                        type="text"
                        name="style"
                        value={formData.style}
                        onChange={handleChange}
                        required />
                </div>

                <div className="form-group">
                    <label>Purchase Price ($)</label>
                        <input
                            type="number"
                            name="purchasePrice"
                            value={formData.purchasePrice}
                            onChange={handleChange}
                            step="0.01"
                            min="0"
                            required
                        />
                    
                </div>
                <div className="form-group">
                    <label>Sale Price ($)</label>
                        <input
                            type="number"
                            name="salePrice"
                            value={formData.salePrice}
                            onChange={handleChange}
                            step="0.01"
                            min="0"
                            required
                        />
                    <div className="form-group">
                        <label>Quantity On Hand</label>
                        <input
                            type="number"
                            name="qtyOnHand"
                            value={formData.qtyOnHand}
                            onChange={handleChange}
                            min="0"
                            required />
                    </div>
                    <div className="form-group">
                        <label>Commission Percentage</label>
                        <input
                            type="number"
                            name="commissionPercentage"
                            value={formData.commissionPercentage}
                            onChange={handleChange}
                            step="0.01"
                            min="0"
                            max="100"
                            required />
                    </div>
                </div>

                <div className="form-actions">
                    <button
                        type="button"
                        onClick={() => navigate('/products')}
                        className="btn btn-secondary">
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="btn btn-primary"
                        disabled={mutation.isPending}>
                        {mutation.isPending ? 'Saving...' : 'Save Changes'}
                    </button>
                </div>
            </form>
        </div>
    );
}