import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getProducts } from '../api/salesApi';
import './SalesTracker.css';
import type { Product, GridSetting } from '../types/sales';
import { BagHeart, BagHeartFill } from 'react-bootstrap-icons';
import { useProductContext } from '../contexts/ProductContext';
import type { MouseEvent } from 'react';

export default function Products({ columns, heading }: GridSetting) {
    const { data: products, isLoading } = useQuery<Product[]>({
        queryKey: ['products'],
        queryFn: getProducts
    });

    const { isFavorite, addToFavorites, removeFromFavorites } = useProductContext();

    function handleFavoriteToggle(e: MouseEvent, product: Product) {
        e.preventDefault();
        if (isFavorite(product.id)) {
            removeFromFavorites(product.id);
        } else {
            addToFavorites(product);
        }
    }

    if (isLoading) return <div className="loading">Loading products...</div>;

    return (
        <div className="sales-tracker-container">
            <h1 className="sales-tracker-header">{heading}</h1>
            <Link to="/" className="back-link rounded">
                Back to Dashboard
            </Link>

            <table className="sales-tracker-table">
                <thead>
                    <tr>
                        {columns.map((col, index) => (
                            <th key={index}>{col}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {products?.map(product => {
                        const favorite = isFavorite(product.id);
                        return (
                            <tr key={product.id}>
                                <td>{product.name}</td>
                                <td>{product.manufacturer}</td>
                                <td>{product.style}</td>
                                <td>${product.purchasePrice.toFixed(2)}</td>
                                <td>${product.salePrice.toFixed(2)}</td>
                                <td>{product.qtyOnHand}</td>
                                <td>
                                    <Link to={`/products/${product.id}/edit`}>
                                        Edit
                                    </Link>
                                </td>
                                <td>
                                    {favorite ? (
                                        <BagHeartFill
                                            color="red"
                                            onClick={(e) => handleFavoriteToggle(e, product)}
                                            className="favorite-icon"
                                        />
                                    ) : (
                                        <BagHeart
                                            onClick={(e) => handleFavoriteToggle(e, product)}
                                            className="favorite-icon"
                                        />
                                    )}
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
}