// Product types
export interface Product {
    id: number;
    name: string;
    manufacturer: string;
    style: string;
    purchasePrice: number;
    salePrice: number;
    qtyOnHand: number;
    commissionPercentage: number;
}

export type ProductCreateDto = Omit<Product, 'id'>;

export interface ProductUpdateDto {
    name: string;
    manufacturer: string;
    style: string;
    purchasePrice: number;
    salePrice: number;
    qtyOnHand: number;
    commissionPercentage: number;
}

// Salesperson types
export interface Salesperson {
    id: number;
    firstName: string;
    lastName: string;
    address: string;
    phone: string;
    startDate: string; // ISO date string
    terminationDate: string | null;
    manager: string;
}

export type SalespersonCreateDto = Omit<Salesperson, 'id'>;
export interface SalespersonUpdateDto {
    firstName: string;
    lastName: string;
    address?: string;
    phone?: string;
    startDate?: string; // ISO date string
    terminationDate?: string | null;
    manager?: string;
}

// Customer types
export interface Customer {
    id: number;
    firstName: string;
    lastName: string;
    address: string;
    phone: string;
    startDate: string;
}

export interface Sale {
    id: number;
    salesDate: string;
    product: Product;
    customer: Customer;
    salesperson: Salesperson;
}

export interface SaleUpdateDto {
    productId: number;
    salespersonId: number;
    customerId: number;
    salesDate: string;
    commissionAmount: number;
}
export interface SaleWithDetails extends Sale {
    product: Product;
    salesperson: Salesperson;
    customer: Customer;
}

export interface SaleCreateDto {
    productId: number;
    salespersonId: number;
    customerId: number;
    saleDate?: string;
}

// Discount types
export interface Discount {
    id: number;
    productId: number;
    beginDate: string; //
    endDate: string;
    discountPercentage: number;
}

// API Response types
export interface ApiResponse<T> {
    data: T;
    message?: string;
    success: boolean;
}