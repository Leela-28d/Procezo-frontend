import api from "./api";

export const getPurchaseOrders = () => {
    return api.get("/purchase-orders");
};