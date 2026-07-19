import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../services/authService";
import "./Login.css";

function Login() {

    const navigate = useNavigate();

    const [email, setEmail] = useState("");

    const [password, setPassword] = useState("");

    const [loading, setLoading] = useState(false);

    const [error, setError] = useState("");

    const handleSubmit = async (e) => {

        e.preventDefault();

        setError("");

        try {

            setLoading(true);

            await login(email, password);

            navigate("/dashboard");

        } catch (err) {

            console.log(err);

            if (err.response) {

                setError(err.response.data.message || "Invalid Credentials");

            } else {

                setError("Unable to connect to server");

            }

        } finally {

            setLoading(false);

        }

    };

    return (

        <div className="login-container">

            <div className="login-card">

                <div className="login-left">

                    <h1>ProcureFlow</h1>

                    <p>
                        Procurement Workflow Automation Platform
                    </p>

                    <img
                        src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
                        alt="login"
                    />

                </div>

                <div className="login-right">

                    <h2>Welcome Back</h2>

                    <p>Please login to continue</p>

                    <form onSubmit={handleSubmit}>

                        <input

                            type="email"

                            placeholder="Email"

                            value={email}

                            onChange={(e) => setEmail(e.target.value)}

                            required

                        />

                        <input

                            type="password"

                            placeholder="Password"

                            value={password}

                            onChange={(e) => setPassword(e.target.value)}

                            required

                        />

                        {

                            error &&

                            <div className="error">

                                {error}

                            </div>

                        }

                        <button>

                            {

                                loading

                                    ?

                                    "Logging In..."

                                    :

                                    "Login"

                            }

                        </button>

                    </form>

                </div>

            </div>

        </div>

    );

}

export default Login;