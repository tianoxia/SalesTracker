import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Products from './pages/Products';
import Dashboard from './pages/Dashboard';
import Salespersons from './pages/Salespersons';
import EditSalesperson from './pages/EditSalesperson';
import EditProduct from './pages/EditProduct';
import Customers from './pages/Customers';
import Sales from './pages/SaleList';
import NewSale from './pages/NewSale';
import Commission from './pages/CommissionReport';

export default function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/products" element={<Products />} />       
                <Route path="/products/:id/edit" element={<EditProduct />} />
                <Route path="/salespersons" element={<Salespersons />} />
                <Route path="/salespersons/:id/edit" element={<EditSalesperson />} />
                <Route path="/customers" element={<Customers />} />
                <Route path="/sales" element={<Sales />} />
                <Route path="/sales/new" element={<NewSale />} />
                <Route path="/commission-report" element={<Commission />} />
            </Routes>
        </BrowserRouter>
    );
}