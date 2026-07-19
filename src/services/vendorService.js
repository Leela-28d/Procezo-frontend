import api from "./api";

export const getVendors = () => {

    return api.get("/vendors");

};

export const addVendor = (vendor) => {

    return api.post("/vendors", vendor);

};