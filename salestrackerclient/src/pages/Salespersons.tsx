import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getSalespersons } from '../api/salesApi';
import type { Salesperson } from '../types/sales';
import './SalesTracker.css';

export default function Salespersons() {

    // Fetch salespersons data
    const { data: salesperson, isLoading } = useQuery<Salesperson[]>({
        queryKey: ['salespersons'],
        queryFn: getSalespersons
    });

    if (isLoading) return <div className="loading">Loading sales team...</div>;

    return (
        <div className="sales-tracker-container">
            <h1 className="sales-tracker-header">Sales Team</h1>
            <Link
                to="/"
                className="back-link rounded">
                Back to Dashboard
            </Link>
            <table className="sales-tracker-table">
                <thead>
                    <tr className="bg-gray-100">
                        <th>Name</th>
                        <th>Phone</th>
                        <th>Start Date</th>
                        <th>Termination Date</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {salesperson?.map(sp => (
                        <tr key={sp.id}>
                            <td>
                                {sp.firstName} {sp.lastName}
                            </td>
                            <td>{sp.phone}</td>
                            <td>
                                {new Date(sp.startDate).toLocaleDateString()}
                            </td>
                            <td>
                                {sp.terminationDate ? new Date(sp.terminationDate).toLocaleDateString() : 'N/A'}
                            </td>
                            <td>
                                <Link
                                    to={`/salespersons/${sp.id}/edit`}>
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