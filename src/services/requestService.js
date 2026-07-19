import api from "./api";

export const getMyRequests = async () => {
    const response = await api.get("/requests/my");
    return response.data;
};

export const createRequest = async (request) => {
    const response = await api.post("/requests", request);
    return response.data;
};  

export const getPendingRequests = async () => {
    const res = await api.get("/requests/pending");
    return res.data;
};

export const getHistory = async (id) => {
    const res = await api.get(`/requests/${id}/history`);
    return res.data;
};

export const resubmitRequest = async (id, request) => {
    const res = await api.patch(`/requests/${id}/resubmit`, request);
    return res.data;
};