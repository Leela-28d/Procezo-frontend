import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import { getPurchaseOrders } from "../services/purchaseOrderService";

function PurchaseOrders() {

    const [orders, setOrders] = useState([]);

    useEffect(() => {
        loadPurchaseOrders();
    }, []);

    const loadPurchaseOrders = async () => {
        try {
            const response = await getPurchaseOrders();
            setOrders(response.data);
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <>
            <Sidebar />

            <div
                style={{
                    marginLeft: "260px",
                    padding: "30px"
                }}
            >
                <Navbar />

                <h2>Purchase Orders</h2>

                <table className="vendor-table">

                    <thead>
                        <tr>
                            <th>PO ID</th>
                            <th>Request ID</th>
                            <th>Vendor</th>
                            <th>Generated On</th>
                            <th>PDF</th>
                        </tr>
                    </thead>

                    <tbody>

                        {orders.map(order => (

                            <tr key={order.id}>

                                <td>{order.id}</td>

                                <td>{order.purchaseRequest.id}</td>

                                <td>{order.vendor.name}</td>

                                <td>
                                    {new Date(order.generatedAt).toLocaleString()}
                                </td>

                                <td>
                                    {
                                        order.pdfUrl ?

                                            <a
                                                href={order.pdfUrl}
                                                target="_blank"
                                                rel="noreferrer"
                                            >
                                                View PDF
                                            </a>

                                            :

                                            "Not Generated"
                                    }
                                </td>

                            </tr>

                        ))}

                    </tbody>

                </table>

            </div>

        </>
    );
}

export default PurchaseOrders;