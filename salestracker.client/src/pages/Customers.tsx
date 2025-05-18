import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getCustomers } from '../api/salesApi';
import './SalesTracker.css';
import type { Customer } from '../types/sales';

export default function Customers() {
    const { data: customers, isLoading } = useQuery<Customer[]>({
        queryKey: ['customers'],
        queryFn: getCustomers
    });

    if (isLoading) return <div className="loading">Loading customers...</div>;

    return (
        <div className="sales-tracker-container">
            <div className="flex justify-between items-center mb-6">
                <h1 className="sales-tracker-header">Customer List</h1>
                <Link
                    to="/"
                    className="back-link rounded"
                >
                    Back to Dashboard
                </Link>
            </div>

            <table className="sales-tracker-table">
                <thead>
                    <tr>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Address</th>
                        <th>Phone</th>
                        <th>Start Date</th>
                    </tr>
                </thead>
                <tbody>
                    {customers?.map(customer => (
                        <tr key={customer.id}>
                            <td>{customer.firstName}</td>
                            <td>{customer.lastName}</td>
                            <td>{customer.address}</td>
                            <td>{customer.phone}</td>
                            <td>{new Date(customer.startDate).toLocaleDateString()}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}