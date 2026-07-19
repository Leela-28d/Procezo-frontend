import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import {
    createInvoice,
    getPendingInvoices,
    verifyInvoice,
    rejectInvoice
} from "../services/invoiceService";

function Invoices() {

    const role = localStorage.getItem("role");

    const [purchaseOrderId, setPurchaseOrderId] = useState("");
    const [amount, setAmount] = useState("");

    const [invoices, setInvoices] = useState([]);

    useEffect(() => {
        if (role === "FINANCE" || role === "ADMIN") {
            loadInvoices();
        }
    }, []);

    const loadInvoices = async () => {
        const res = await getPendingInvoices();
        setInvoices(res.data);
    };

    // const uploadInvoice = async () => {

    //     await createInvoice(purchaseOrderId, amount);

    //     alert("Invoice Created");

    //     setPurchaseOrderId("");
    //     setAmount("");
    // };

//     const uploadInvoice = async () => {

//     console.log("PO ID:", purchaseOrderId);
//     console.log("Amount:", amount);

//     await createInvoice(purchaseOrderId, amount);

//     alert("Invoice Created");

//     setPurchaseOrderId("");
//     setAmount("");
// };


    const uploadInvoice = async () => {

    console.log("PO ID:", purchaseOrderId);
    console.log("Amount:", amount);

    await createInvoice(purchaseOrderId, amount);

    alert("Invoice Created");

    setPurchaseOrderId("");
    setAmount("");
};

    const approve = async (id) => {
        await verifyInvoice(id);
        loadInvoices();
    };

    const reject = async (id) => {
        await rejectInvoice(id);
        loadInvoices();
    };

    return (

        <>
            <Sidebar />

            <div style={{ marginLeft: 260, padding: 30 }}>

                <Navbar />

                <h2>Invoices</h2>

                {(role === "PROCUREMENT" || role === "ADMIN") && (

                    <>
                        <input
                            placeholder="Purchase Order Id"
                            value={purchaseOrderId}
                            onChange={(e) => setPurchaseOrderId(e.target.value)}
                        />

                        <input
                            placeholder="Invoice Amount"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                        />

                        <button onClick={uploadInvoice}>
                            Create Invoice
                        </button>
                    </>
                )}

                {(role === "FINANCE" || role === "ADMIN") && (

                    <table>

                        <thead>

                        <tr>
                            <th>ID</th>
                            <th>PO</th>
                            <th>Amount</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>

                        </thead>

                        <tbody>

                        {invoices.map(i => (

                            <tr key={i.id}>

                                <td>{i.id}</td>

                                <td>{i.purchaseOrderId}</td>

                                <td>₹ {i.amount}</td>

                                <td>{i.status}</td>

                                <td>

                                    <button
                                        onClick={() => approve(i.id)}>
                                        Verify
                                    </button>

                                    <button
                                        onClick={() => reject(i.id)}>
                                        Reject
                                    </button>

                                </td>

                            </tr>

                        ))}

                        </tbody>

                    </table>

                )}

            </div>

        </>

    );
}

export default Invoices;