import api from "./api";

export const createInvoice = (purchaseOrderId, amount) =>
    api.post(`/invoices/${purchaseOrderId}?amount=${amount}`);

export const getPendingInvoices = () =>
    api.get("/invoices/pending");

export const verifyInvoice = (invoiceId) =>
    api.put(`/invoices/${invoiceId}/verify`);

export const rejectInvoice = (invoiceId) =>
    api.put(`/invoices/${invoiceId}/reject`);