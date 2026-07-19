import React from "react";
import "./RequestCard.css";

function RequestCard({ request }) {

    const getColor = () => {

        switch (request.status) {

            case "PENDING":
                return "#f59e0b";

            case "APPROVED":
                return "#10b981";

            case "REJECTED":
                return "#ef4444";

            default:
                return "#2563eb";
        }
    };

    return (

        <div className="request-card">

            <div className="request-top">

                <h3>{request.itemName}</h3>

                <span
                    className="status"
                    style={{ background: getColor() }}
                >
                    {request.status}
                </span>

            </div>

            <p><strong>Department:</strong> {request.department}</p>

            <p><strong>Amount:</strong> ₹{request.amount}</p>

            <p><strong>Priority:</strong> {request.priority}</p>

        </div>

    );
}

export default RequestCard;