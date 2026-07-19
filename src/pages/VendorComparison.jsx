// import { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import Sidebar from "../components/Sidebar";
// import api from "../services/api";

// function VendorComparison() {

//     const { requestId } = useParams();

//     const [quotations, setQuotations] = useState([]);

//     useEffect(() => {
//         loadQuotations();
//     }, []);

//     const loadQuotations = () => {
//         api.get(`/vendors/${requestId}/compare`)
//             .then(res => setQuotations(res.data))
//             .catch(console.log);
//     };

//     const selectVendor = (vendorId) => {

//         api.post(`/vendors/${requestId}/select/${vendorId}`)
//             .then(() => {
//                 alert("Vendor Selected.\nPurchase Order Generated.");
//                 loadQuotations();
//             })
//             .catch(console.log);

//     };

//     return (

//         <>
//             <Sidebar />

//             <div
//                 style={{
//                     marginLeft: "260px",
//                     padding: "30px"
//                 }}
//             >

//                 <h2>Vendor Comparison</h2>

//                 <table>

//                     <thead>

//                     <tr>
//                         <th>Vendor</th>
//                         <th>Price</th>
//                         <th>Delivery</th>
//                         <th>Rating</th>
//                         <th>Score</th>
//                         <th></th>
//                     </tr>

//                     </thead>

//                     <tbody>

//                     {
//                         quotations.map(q => (

//                             <tr key={q.id}>

//                                 <td>{q.vendor.name}</td>

//                                 <td>₹ {q.price}</td>

//                                 <td>{q.deliveryDays} Days</td>

//                                 <td>{q.vendor.rating}</td>

//                                 <td>{q.score?.toFixed(2)}</td>

//                                 <td>

//                                     <button
//                                         onClick={() => selectVendor(q.vendor.id)}
//                                     >
//                                         Select
//                                     </button>

//                                 </td>

//                             </tr>

//                         ))
//                     }

//                     </tbody>

//                 </table>

//             </div>

//         </>
//     );

// }

// export default VendorComparison;















import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import api from "../services/api";

function VendorComparison() {

    const { requestId } = useParams();

    const [quotations, setQuotations] = useState([]);

    useEffect(() => {

        api.get(`/vendors/${requestId}/compare`)
            .then(res => setQuotations(res.data))
            .catch(console.log);

    }, [requestId]);

    const selectVendor = (vendorId) => {

        api.post(`/vendors/${requestId}/select/${vendorId}`)
            .then(() => {

                alert("Vendor Selected Successfully");

            })
            .catch(console.log);

    };

    return (

        <>
            <Sidebar />

            <div style={{ marginLeft: "250px", padding: "30px" }}>

                <Header />

                <h2>Vendor Comparison</h2>

                <table className="vendor-table">

                    <thead>

                    <tr>

                        <th>Vendor</th>
                        <th>Price</th>
                        <th>Delivery Days</th>
                        <th>Rating</th>
                        <th>Score</th>
                        <th></th>

                    </tr>

                    </thead>

                    <tbody>

                    {

                        quotations.map(q => (

                            <tr key={q.id}>

                                <td>{q.vendor.name}</td>

                                <td>₹ {q.price}</td>

                                <td>{q.deliveryDays}</td>

                                <td>{q.vendor.rating}</td>

                                <td>{q.score?.toFixed(2)}</td>

                                <td>

                                    <button
                                        onClick={() => selectVendor(q.vendor.id)}
                                    >
                                        Select
                                    </button>

                                </td>

                            </tr>

                        ))

                    }

                    </tbody>

                </table>

            </div>

        </>

    );

}

export default VendorComparison;