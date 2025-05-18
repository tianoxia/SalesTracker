import { Link } from 'react-router-dom';
import './SalesTracker.css';

export default function Dashboard() {
    return (
        <div className="form-container">
            <h1 className="form-header">Sales Tracker Dashboard</h1>
            <hr />
            <div className="form-group">
                {/* Products Card */}
                <Link to="/products" className="form-control">
                    <h2 className="form-group-header">Products</h2>
                </Link>

                {/* Salespersons Card */}
                <Link to="/salespersons" className="form-control">
                    <h2 className="form-group-header">Sales Team</h2>
                </Link>

                {/* Customers Card */}
                <Link to="/customers" className="form-control">
                    <h2 className="form-group-header">Customers</h2>
                </Link>

                {/* Sales Card */}
                <Link to="/sales" className="form-control">
                    <h2 className="form-group-header">Sales Records</h2>
                </Link>
                {/* Commission Report */}
                <Link to="/commission-report" className="form-control">
                    <h2 className="form-group-header">Quarterly Commission Report</h2>
                </Link>
            </div>
        </div>
    );
}