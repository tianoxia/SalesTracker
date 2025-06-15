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
import { ProductProvider } from './contexts/ProductContext';
import FavoritedProducts from './pages/FavoritedProducts';

const PRODUCT_COLUMNS = ['Name', 'Manufacturer', 'Style', 'Purchase Price', 'Sale Price', 'Qty On Hand', 'Actions', 'Favorite'];
const FAVORITE_COLUMNS = ['Name', 'Manufacturer', 'Style', 'Purchase Price', 'Sale Price', 'Qty On Hand', 'Actions'];
const SALESPERSON_COLUMNS = ['Name', 'Phone', 'Start Date', 'Termination Date', 'Actions'];
const CUSTOMER_COLUMNS = ['First Name', 'Last Name', 'Address', 'Phone', 'Start Date'];
const SALES_COLUMNS = ['Date', 'Product', 'Customer', 'Price', 'Salesperson', 'Commission'];
export default function App() {
    return (
        <BrowserRouter>
            <ProductProvider>
                <Routes>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/products" element={<Products columns={PRODUCT_COLUMNS} heading='Product Inventory' />} />
                    <Route path="/products/:id/edit" element={<EditProduct />} />
                    <Route path="/salespersons" element={<Salespersons columns={SALESPERSON_COLUMNS} heading='Sales Team' />} />
                    <Route path="/salespersons/:id/edit" element={<EditSalesperson />} />
                    <Route path="/customers" element={<Customers columns={CUSTOMER_COLUMNS} heading='Customer List' />} />
                    <Route path="/sales" element={<Sales columns={SALES_COLUMNS} heading='Sales Records' />} />
                    <Route path="/sales/new" element={<NewSale />} />
                    <Route path="/commission-report" element={<Commission />} />
                    <Route path="/favorited-products" element={<FavoritedProducts columns={FAVORITE_COLUMNS} heading='Your Favorited Products' />} />
                </Routes>
            </ProductProvider>
        </BrowserRouter>
    );
}