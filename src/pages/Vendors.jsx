import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import { getVendors, addVendor } from "../services/vendorService";
import "./Vendors.css";

function Vendors() {

    const [vendors, setVendors] = useState([]);

    const [vendor, setVendor] = useState({
        name: "",
        contactEmail: "",
        address: "",
        rating: ""
    });

    useEffect(() => {
        loadVendors();
    }, []);

    const loadVendors = async () => {

        try {

            const response = await getVendors();

            setVendors(response.data);

        } catch (err) {

            console.log(err);

        }

    };

    const handleChange = (e) => {

        setVendor({

            ...vendor,

            [e.target.name]: e.target.value

        });

    };

    const saveVendor = async (e) => {

        e.preventDefault();

        try {

            await addVendor(vendor);

            setVendor({

                name: "",

                contactEmail: "",

                address: "",

                rating: ""

            });

            loadVendors();

        }

        catch (err) {

            console.log(err);

        }

    };

    return (

        <>

            <Sidebar />

            <div
                className="vendor-page"
                style={{
                    marginLeft: "260px",
                    padding: "30px"
                }}
            >

                <Navbar />

                <h2>Vendor Management</h2>

                <form
                    className="vendor-form"
                    onSubmit={saveVendor}
                >

                    <input
                        type="text"
                        placeholder="Vendor Name"
                        name="name"
                        value={vendor.name}
                        onChange={handleChange}
                        required
                    />

                    <input
                        type="email"
                        placeholder="Contact Email"
                        name="contactEmail"
                        value={vendor.contactEmail}
                        onChange={handleChange}
                        required
                    />

                    <input
                        type="text"
                        placeholder="Address"
                        name="address"
                        value={vendor.address}
                        onChange={handleChange}
                        required
                    />

                    <input
                        type="number"
                        step="0.1"
                        placeholder="Rating"
                        name="rating"
                        value={vendor.rating}
                        onChange={handleChange}
                        required
                    />

                    <button type="submit">

                        Add Vendor

                    </button>

                </form>

                <table className="vendor-table">

                    <thead>

                        <tr>

                            <th>ID</th>

                            <th>Name</th>

                            <th>Email</th>

                            <th>Rating</th>

                            <th>Address</th>

                        </tr>

                    </thead>

                    <tbody>

                        {

                            vendors.map((v) => (

                                <tr key={v.id}>

                                    <td>{v.id}</td>

                                    <td>{v.name}</td>

                                    <td>{v.contactEmail}</td>

                                    <td>{v.rating}</td>

                                    <td>{v.address}</td>

                                </tr>

                            ))

                        }

                    </tbody>

                </table>

            </div>

        </>

    );

}

export default Vendors;