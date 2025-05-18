import React, { useState, useEffect } from 'react';
import { getQuarterlyCommissions } from '../api/salesApi';
import type { QuarterlyCommission, CommissionReportFilters } from '../types/commission';
import './SalesTracker.css';
import { Link } from 'react-router-dom';

export default function CommissionReport() {
    const currentYear = new Date().getFullYear();
    const [reportData, setReportData] = useState<QuarterlyCommission[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [filters, setFilters] = useState<CommissionReportFilters>({
        year: currentYear,
        quarter: 1,
        salespersonId: undefined
    });

    const years = Array.from({ length: 10 }, (_, i) => currentYear - i);
    const quarters = [1, 2, 3, 4];

    useEffect(() => {
        const fetchCommissionData = async () => {
            setLoading(true);
            setError(null);
            try {
                const data = await getQuarterlyCommissions(filters);
                setReportData(data);
            } catch (err) {
                setError('Failed to load commission data');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchCommissionData();
    }, [filters]);

    const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFilters(prev => ({
            ...prev,
            [name]: value ? parseInt(value) : undefined
        }));
    };

    const formatCurrency = (amount: number): string => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD'
        }).format(amount);
    };

    if (loading) return <div className="loading">Loading report...</div>;
    if (error) return <div className="error-text">{error}</div>;

    return (
        <div className="form-container">
            <h1 className="form-header">Quarterly Commission Report</h1>
            <Link to="/" className="back-link rounded">
                Back to Dashboard
            </Link>
            {/* Filters */}
            <div className="form-group" style={{paddingTop: '1rem'}}>
                <label>Year</label>
                <select
                    name="year"
                    value={filters.year}
                    onChange={handleFilterChange}>
                    {years.map(year => (
                        <option key={year} value={year}>{year}</option>
                    ))}
                </select>
                <label>Quarter</label>
                <select
                    name="quarter"
                    value={filters.quarter || ''}
                    onChange={handleFilterChange}>
                    <option value="">All Quarters</option>
                    {quarters.map(q => (
                        <option key={q} value={q}>Q{q}</option>
                    ))}
                </select>
            </div>

            {/* Report Table */}
            <table className="sales-tracker-table">
                <thead>
                    <tr>
                        <th>
                            Salesperson
                        </th>
                        <th>
                            Quarter
                        </th>
                        <th>
                            Total Sales
                        </th>
                        <th>
                            Total Commission
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {reportData.length > 0 ? (
                        reportData.map((item) => (
                            <React.Fragment key={`${item.salespersonId}-${filters.quarter}-${filters.year}`}>
                                <tr>
                                    <td>
                                        {item.salespersonName}
                                    </td>
                                    <td>
                                        Q{filters.quarter} {filters.year}
                                    </td>
                                    <td>
                                        {formatCurrency(item.totalSales)}
                                    </td>
                                    <td>
                                        {formatCurrency(item.totalCommission)}
                                    </td>
                                </tr>
                            </React.Fragment>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={4}>
                                No commission data found for the selected year and quarter.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}