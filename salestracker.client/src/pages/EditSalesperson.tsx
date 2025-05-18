import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery, useMutation } from '@tanstack/react-query';
import { getSalesperson, updateSalesperson } from '../api/salesApi';
import type { Salesperson } from '../types/sales';
import { formatDateForDisplay, parseDateForApi } from '../utils/dateUtils';
import './SalesTracker.css';

export default function EditSalesperson() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [formData, setFormData] = useState<Salesperson>({
        id: 0,
        firstName: '',
        lastName: '',
        address: '',
        phone: '',
        startDate: formatDateForDisplay(new Date().toISOString()),
        terminationDate: null,
        manager: ''
    });

    // Fetch salesperson data
    const { data: salesperson, isLoading } = useQuery({
        queryKey: ['salesperson', id],
        queryFn: () => getSalesperson(Number(id))
    });

    // Update mutation
    const mutation = useMutation({
        mutationFn: () => updateSalesperson(Number(id), {
            ...formData,
            startDate: parseDateForApi(formData.startDate)??undefined,
            terminationDate: parseDateForApi(formData.terminationDate!)
        }),
        onSuccess: () => navigate('/salespersons')
    });

    // Initialize form when data loads
    useEffect(() => {
        if (salesperson) {
            
            setFormData({
                id: salesperson.id,
                firstName: salesperson.firstName,
                lastName: salesperson.lastName,
                address: salesperson.address,
                phone: salesperson.phone,
                startDate: formatDateForDisplay(salesperson.startDate),
                terminationDate: formatDateForDisplay(salesperson.terminationDate),
                manager: salesperson.manager
            });
        }
    }, [salesperson]);
    const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        let formattedValue = value.replace(/\D/g, '');
        if (formattedValue.length > 2) {
            formattedValue = formattedValue.replace(/^(\d{2})/, '$1/');
        }
        if (formattedValue.length > 5) {
            formattedValue = formattedValue.replace(/^(\d{2}\/\d{2})/, '$1/');
        }
        formattedValue = formattedValue.substring(0, 10);

        setFormData(prev => ({
            ...prev,
            [name]: formattedValue
        }));
    };
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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

    if (isLoading) return <div>Loading salesperson data...</div>;

    return (
        <div className="form-container">
            <h1 className="form-header">Edit Salesperson</h1>

            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>First Name</label>
                    <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label>Last Name</label>
                    <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        required
                    />
                </div>

                {/* Add other fields with the same structure */}
                <div className="form-group">
                    <label>Start Date (MM/DD/YYYY)</label>
                    <input
                        type="text"
                        name="startDate"
                        value={formData.startDate}
                        onChange={handleDateChange} />
                </div>

                <div className="form-group">
                    <label>Termination Date (MM/DD/YYYY)</label>
                    <input
                        type="text"
                        name="terminationDate"
                        value={formData.terminationDate ?? ''}
                        onChange={handleDateChange} />
                </div>

                <div className="form-actions">
                    <button
                        type="button"
                        onClick={() => navigate('/salespersons')}
                        className="btn btn-secondary"
                    >
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