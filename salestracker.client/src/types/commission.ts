export interface QuarterlyCommission {
    quarter: number;
    year: number;
    salespersonId: number;
    salespersonName: string;
    totalSales: number;
    totalCommission: number;
    monthlyBreakdown: {
        month: number;
        sales: number;
        commission: number;
    }[];
}

export interface CommissionReportFilters {
    year: number;
    quarter?: number;
    salespersonId?: number;
}