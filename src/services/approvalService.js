import api from "./api";

export const getPendingRequests = async () => {
    const res = await api.get("/approvals/pending");
    return res.data;
};

export const approveRequest = async (id) => {
    const res = await api.post(`/approvals/${id}`, {
        actionType: "APPROVE",
        comment: ""
    });

    return res.data;
};

export const rejectRequest = async (id, comment) => {
    const res = await api.post(`/approvals/${id}`, {
        actionType: "REJECT",
        comment
    });

    return res.data;
};