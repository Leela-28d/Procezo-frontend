// import React, { useEffect, useState } from "react";
// import { createRequest, getMyRequests } from "../services/requestService";
// import RequestCard from "../components/RequestCard";

// import "./PurchaseRequest.css";
// import Sidebar from "../components/Sidebar";

// function PurchaseRequest() {

//     const [requests, setRequests] = useState([]);

//     const [form, setForm] = useState({

//         itemName: "",

//         amount: "",

//         department: "",

//         priority: "MEDIUM"

//     });

//     const loadRequests = async () => {

//         try {

//             const data = await getMyRequests();

//             setRequests(data);

//         } catch (e) {

//             console.log(e);

//         }

//     };

//     useEffect(() => {

//         loadRequests();

//     }, []);

//     const submit = async (e) => {

//         e.preventDefault();

//         await createRequest(form);

//         setForm({

//             itemName: "",

//             amount: "",

//             department: "",

//             priority: "MEDIUM"

//         });

//         loadRequests();

//     };

//     return (


//      <>
//         <Sidebar />

//         <div
//             className="purchase-page"
//             style={{
//                 marginLeft: "270px",
//                 padding: "40px"
//             }}
//         >

//             {/* Your existing Purchase Request code */}



//             <div className="request-page">

//             <div className="header">

//                 <h1>Purchase Requests</h1>

//             </div>

//             <form className="request-form" onSubmit={submit}>

//                 <input

//                     placeholder="Item Name"

//                     value={form.itemName}

//                     onChange={(e) =>
//                         setForm({
//                             ...form,
//                             itemName: e.target.value,
//                         })
//                     }

//                 />

//                 <input

//                     placeholder="Department"

//                     value={form.department}

//                     onChange={(e) =>
//                         setForm({
//                             ...form,
//                             department: e.target.value,
//                         })
//                     }

//                 />

//                 <input

//                     type="number"

//                     placeholder="Amount"

//                     value={form.amount}

//                     onChange={(e) =>
//                         setForm({
//                             ...form,
//                             amount: e.target.value,
//                         })
//                     }

//                 />

//                 <select

//                     value={form.priority}

//                     onChange={(e) =>
//                         setForm({
//                             ...form,
//                             priority: e.target.value,
//                         })
//                     }

//                 >

//                     <option>LOW</option>

//                     <option>MEDIUM</option>

//                     <option>HIGH</option>

//                 </select>

//                 <button>Create Request</button>

//             </form>

//             <div className="list">

//                 {requests.map((r) => (

//                     <RequestCard

//                         key={r.id}

//                         request={r}

//                     />

//                 ))}

//             </div>

//         </div>

//         </div>
//     </>

        

//     );
// }

// export default PurchaseRequest;
















import { useEffect, useState } from "react";
import api from "../services/api";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import "./PurchaseRequest.css";

function PurchaseRequest() {

    const [requests, setRequests] = useState([]);

    const [form, setForm] = useState({
        item: "",
        quantity: "",
        estimatedCost: "",
        justification: ""
    });

    const loadRequests = () => {

        api.get("/requests/my")
            .then(res => setRequests(res.data))
            .catch(console.log);

    };

    useEffect(() => {

        loadRequests();

    }, []);

    const createRequest = () => {

        api.post("/requests", form)
            .then(() => {

                setForm({
                    item: "",
                    quantity: "",
                    estimatedCost: "",
                    justification: ""
                });

                loadRequests();

            })
            .catch(console.log);

    };

    return (

        <>

            <Sidebar/>

            <div className="request-page">

                <Header/>

                <h1>Purchase Requests</h1>

                <div className="request-form">

                    <input
                        placeholder="Item"
                        value={form.item}
                        onChange={(e)=>setForm({...form,item:e.target.value})}
                    />

                    <input
                        type="number"
                        placeholder="Quantity"
                        value={form.quantity}
                        onChange={(e)=>setForm({...form,quantity:e.target.value})}
                    />

                    <input
                        type="number"
                        placeholder="Estimated Cost"
                        value={form.estimatedCost}
                        onChange={(e)=>setForm({...form,estimatedCost:e.target.value})}
                    />

                    <input
                        placeholder="Justification"
                        value={form.justification}
                        onChange={(e)=>setForm({...form,justification:e.target.value})}
                    />

                    <button onClick={createRequest}>
                        Create Request
                    </button>

                </div>

                <table className="request-table">

                    <thead>

                    <tr>
                        <th>ID</th>
                        <th>Item</th>
                        <th>Quantity</th>
                        <th>Cost</th>
                        <th>Status</th>
                        <th>Stage</th>
                    </tr>

                    </thead>

                    <tbody>

                    {

                        requests.map(request=>(

                            <tr key={request.id}>

                                <td>{request.id}</td>

                                <td>{request.item}</td>

                                <td>{request.quantity}</td>

                                <td>₹ {request.estimatedCost}</td>

                                <td>

                                    <span className={`status ${
                                        request.status==="COMPLETED"
                                        ? "approved"
                                        : request.status==="RETURNED_FOR_REVISION"
                                        ? "rejected"
                                        : "pending"
                                    }`}>

                                        {request.status}

                                    </span>

                                </td>

                                <td>{request.currentStageName}</td>

                            </tr>

                        ))

                    }

                    </tbody>

                </table>

            </div>

        </>

    );

}

export default PurchaseRequest;