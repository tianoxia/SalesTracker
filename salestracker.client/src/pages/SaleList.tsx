import { Link } from 'react-router-dom';
import type { Sale } from '../types/sales';
import './SalesTracker.css';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getSales } from '../api/salesApi';
import DateRangeFilter from './DateRangeFilter';

interface DateFilter {
    startDate: Date | null;
    endDate: Date | null;
}
export default function SalesList() {
    const [sales, setSales] = useState<Sale[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [filter, setFilter] = useState<DateFilter>({
        startDate: null,
        endDate: null
    });
    const navigate = useNavigate();

    useEffect(() => {
        const fetchSales = async () => {
            setLoading(true);
            setError(null);

            try {
                const params = new URLSearchParams();

                if (filter.startDate) {
                    params.append('startDate', filter.startDate.toISOString());
                }
                if (filter.endDate) {
                    params.append('endDate', filter.endDate.toISOString());
                }

                const data = await getSales(params.toString());
                setSales(data);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Failed to fetch sales');
                console.error('Error fetching sales:', err);
            } finally {
                setLoading(false);
            }
        };
        fetchSales();
    }, [filter]);

    const calculateCommission = (sale: Sale): number => {
        return sale.product.salePrice * (sale.product.commissionPercentage / 100);
    };

    if (loading) return <div className="loading">Loading sales data...</div>;
    if (error) return <div className="error-text">Error: {error}</div>;

    return (
        <div className="sales-tracker-container">            
            <h1 className="sales-tracker-header">Sales Records</h1>
            <Link
                to="/"
                className="back-link rounded">
                Back to Dashboard
            </Link>
            <div>
                <DateRangeFilter
                    onFilter={setFilter}
                    initialValues={{
                        startDate: filter.startDate,
                        endDate: filter.endDate
                    }}
                />
                <button
                    onClick={() => navigate('/sales/new')}
                    className="btn btn-green btn-small">
                    New Sale
                </button>
            </div>
            
            <table className="sales-tracker-table">
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Product</th>
                        <th>Customer</th>
                        <th>Price</th>
                        <th>Salesperson</th>
                        <th>Commission</th>
                    </tr>
                </thead>
                <tbody>
                    {sales.length > 0 ? (
                        sales.map((sale) => (
                            <tr key={sale.id}>
                                <td>
                                    {new Date(sale.salesDate).toLocaleDateString()}
                                </td>
                                <td>
                                    {sale.product.name}
                                </td>
                                <td>
                                    {`${sale.customer.firstName} ${sale.customer.lastName}`}
                                </td>
                                <td>
                                    ${sale.product.salePrice.toFixed(2)}
                                </td>
                                <td>
                                    {`${sale.salesperson.firstName} ${sale.salesperson.lastName}`}
                                </td>
                                <td>
                                    ${calculateCommission(sale).toFixed(2)}
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={6}>
                                No sales records found
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}