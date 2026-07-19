import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import {
    getPendingRequests,
    approveRequest,
    rejectRequest
} from "../services/approvalService";

import "./Approvals.css";

function Approvals() {

    const [requests, setRequests] = useState([]);

    const loadRequests = async () => {
        try {
            const data = await getPendingRequests();
            setRequests(data);
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        loadRequests();
    }, []);

    const approve = async (id) => {
        try {
            await approveRequest(id);
            alert("Approved");
            loadRequests();
        } catch (err) {
            console.log(err);
        }
    };

    const reject = async (id) => {

        const comment = prompt("Reason for rejection");

        if (comment === null) return;

        try {

            await rejectRequest(id, comment);

            alert("Rejected");

            loadRequests();

        } catch (err) {

            console.log(err);

        }
    };

    return (

        <>
            <Sidebar />

            <div className="approvals-page">

                <h1>Pending Approvals</h1>

                <table>

                    <thead>

                    <tr>
                        <th>ID</th>
                        <th>Employee</th>
                        <th>Item</th>
                        <th>Qty</th>
                        <th>Cost</th>
                        <th>Stage</th>
                        <th>Action</th>
                    </tr>

                    </thead>

                    <tbody>

                    {requests.map(req => (

                        <tr key={req.id}>

                            <td>{req.id}</td>

                            <td>{req.employeeName}</td>

                            <td>{req.item}</td>

                            <td>{req.quantity}</td>

                            <td>₹ {req.estimatedCost}</td>

                            <td>{req.currentStageName}</td>

                            <td>

                                <button
                                    className="approve-btn"
                                    onClick={() => approve(req.id)}
                                >
                                    Approve
                                </button>

                                <button
                                    className="reject-btn"
                                    onClick={() => reject(req.id)}
                                >
                                    Reject
                                </button>

                            </td>

                        </tr>

                    ))}

                    </tbody>

                </table>

            </div>

        </>

    );

}

export default Approvals;