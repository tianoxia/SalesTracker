import { Link } from 'react-router-dom';
//import './SalesTracker.css';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Dashboard() {
    return (
        <div className="form-container">
            <h1 className="form-header">Sales Tracker Dashboard</h1>
            <ul className="list-group">
                <div className="list-group list-group-horizontal"><li className="list-group-item"><Link to="/products"><h3>Products</h3></Link></li><li className="list-group-item"><Link to="/favorited-products"><h3>Favorites</h3></Link></li>
                </div>
                <li className="list-group-item"><Link to="/salespersons">
                    <h3>Sales Team</h3>
                </Link></li>
                <li className="list-group-item"><Link to="/customers">
                    <h3>Customers</h3>
                </Link></li>
                <li className="list-group-item"><Link to="/sales">
                    <h3>Sales Records</h3>
                </Link></li>
                <li className="list-group-item"><Link to="/commission-report">
                    <h3>Quarterly Commission Report</h3>
                </Link></li>
            </ul>
        </div>
    );
}