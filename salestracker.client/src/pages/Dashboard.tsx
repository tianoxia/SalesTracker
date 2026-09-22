import { Link } from 'react-router-dom';
import './SalesTracker.css';

export default function Dashboard() {
    const dashboardLinks = [
        { to: '/products', title: 'Products', description: 'Manage inventory, pricing, and product details.' },
        { to: '/favorited-products', title: 'Favorites', description: 'Quick access to your top tracked products.' },
        { to: '/salespersons', title: 'Sales Team', description: 'View and maintain salesperson profiles.' },
        { to: '/customers', title: 'Customers', description: 'Browse and update customer records.' },
        { to: '/sales', title: 'Sales Records', description: 'Review transactions and sales history.' },
        { to: '/commission-report', title: 'Commission Report', description: 'Check quarterly commission performance.' }
    ];

    return (
        <section className="dashboard-shell">
            <header className="dashboard-header">
                <h1>Sales Tracker Dashboard</h1>
            </header>

            <nav className="dashboard-grid" aria-label="Dashboard navigation">
                {dashboardLinks.map(link => (
                    <Link key={link.to} to={link.to} className="dashboard-tile">
                        <h2>{link.title}</h2>
                        <p>{link.description}</p>
                    </Link>
                ))}
            </nav>
        </section>
    );
}