import api from "./api";

export const getWorkflows = async () => {
    const res = await api.get("/workflows");
    return res.data;
};

export const createWorkflow = async (workflow) => {
    const res = await api.post("/workflows", workflow);
    return res.data;
};

export const activateWorkflow = async (id) => {
    const res = await api.put(`/workflows/${id}/activate`);
    return res.data;
};