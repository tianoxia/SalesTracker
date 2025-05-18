import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getProducts } from '../api/salesApi';
import './SalesTracker.css';
import type { Product } from '../types/sales';

export default function Products() {
    const { data: products, isLoading } = useQuery<Product[]>({
        queryKey: ['products'],
        queryFn: getProducts
    });

    if (isLoading) return <div className="loading">Loading products...</div>;
    return (
        <div className="sales-tracker-container">
            <h1 className="sales-tracker-header">Product Inventory</h1>
            <Link
                to="/"
                className="back-link rounded">
                Back to Dashboard
            </Link>
            <table className="sales-tracker-table">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Manufacture</th>
                        <th>Style</th>
                        <th>Purchase Price</th>
                        <th>Sale Price</th>
                        <th>Qty On Hand</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {products?.map(product => (
                        <tr key={product.id}>
                            <td>{product.name}</td>
                            <td>{product.manufacturer}</td>
                            <td>{product.style}</td>
                            <td>${product.purchasePrice.toFixed(2)}</td>
                            <td>${product.salePrice.toFixed(2)}</td>
                            <td>{product.qtyOnHand}</td>
                            <td>
                                <Link
                                    to={`/products/${product.id}/edit`}>
                                    Edit
                                </Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}