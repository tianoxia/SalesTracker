import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getSalespersons } from '../api/salesApi';
import type { GridSetting, Salesperson } from '../types/sales';
import './SalesTracker.css';

export default function Salespersons({ columns, heading }: GridSetting) {

    // Fetch salespersons data
    const { data: salesperson, isLoading } = useQuery<Salesperson[]>({
        queryKey: ['salespersons'],
        queryFn: getSalespersons
    });

    if (isLoading) return <div className="loading">Loading sales team...</div>;

    return (
        <div className="sales-tracker-container">
            <h1 className="sales-tracker-header">{heading}</h1>
            <Link
                to="/"
                className="back-link rounded">
                Back to Dashboard
            </Link>
            <table className="sales-tracker-table">
                <thead>
                    <tr>
                        {columns.map(col => (
                            <th>{col}</th>
                        ))}
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
                                {sp.terminationDate && new Date(sp.terminationDate).toLocaleDateString()}
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