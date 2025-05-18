import React, { useState } from 'react';
import './SalesTracker.css';
interface DateRangeFilterProps {
    onFilter: (filter: { startDate: Date | null; endDate: Date | null }) => void;
    initialValues?: {
        startDate: Date | null;
        endDate: Date | null;
    };
}

const DateRangeFilter: React.FC<DateRangeFilterProps> = ({
    onFilter,
    initialValues = { startDate: null, endDate: null }
}) => {
    const [startDate, setStartDate] = useState<Date | null>(initialValues.startDate);
    const [endDate, setEndDate] = useState<Date | null>(initialValues.endDate);

    const handleApply = () => {
        onFilter({ startDate, endDate });
    };

    const handleReset = () => {
        setStartDate(null);
        setEndDate(null);
        onFilter({ startDate: null, endDate: null });
    };

    return (
        <div>
            <div className="in-line">
                <label>Start Date</label>
                <input type="date" className="form-input"
                    value={startDate?.toISOString().split('T')[0] || ''}
                    onChange={(e) => setStartDate(e.target.value ? new Date(e.target.value) : null)} />
            </div>
            <div className="in-line">
                <label>End Date</label>
                <input
                    type="date" className="form-input"
                    value={endDate?.toISOString().split('T')[0] || ''}
                    onChange={(e) => setEndDate(e.target.value ? new Date(e.target.value) : null)} />
            </div>
            <div className="flex items-end gap-2">
                <button onClick={handleApply}
                    className="btn btn-primary btn-small">
                    Apply
                </button>
                <button
                    onClick={handleReset}
                    className="btn btn-secondary btn-small transition">
                    Reset
                </button>
            </div>
        </div>
    );
};

export default DateRangeFilter;