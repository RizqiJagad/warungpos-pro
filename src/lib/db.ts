import Dexie, { Table } from "dexie";

export interface LocalProduct {
    id: string;
    name: string;
    sku?: string;
    barcode?: string;
    sellPrice: number;
    stock: number;
    categoryId?: string;
    warungId: string;
    updatedAt: number;
}

export interface LocalTransaction {
    id: string;
    invoiceNumber: string;
    items: any[];
    totalAmount: number;
    paymentMethod: string;
    status: string; // PENDING_SYNC, COMPLETED
    createdAt: number;
    warungId: string;
}

export class WarungPOSDB extends Dexie {
    products!: Table<LocalProduct>;
    transactions!: Table<LocalTransaction>;

    constructor() {
        super("WarungPOSDB");
        this.version(1).stores({
            products: "id, name, sku, barcode, warungId, categoryId",
            transactions: "id, invoiceNumber, status, warungId",
        });
    }
}

export const db = new WarungPOSDB();
