import { Link } from 'react-router-dom';
import { BagHeartFill } from 'react-bootstrap-icons';
import { useProductContext } from '../contexts/ProductContext';
import type { GridSetting } from '../types/sales';
import './SalesTracker.css';

export default function FavoritedProducts({columns, heading }: GridSetting) {
    const { favorites, removeFromFavorites } = useProductContext();

    if (favorites.length === 0) {
        return (
            <div className="favorites-empty">
                <h3>Your favorites list is empty</h3>
                <p>Start by favoriting products from the <Link to="/products">products page</Link></p>
            </div>
        );
    }

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
                    {favorites?.map(product => {
                        //const favorite = isFavorite(product.id);
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
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
}