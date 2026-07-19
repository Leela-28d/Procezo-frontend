import "./Navbar.css";

function Navbar() {

    const email = localStorage.getItem("email") || "User";

    return (

        <div className="navbar">

            <div className="navbar-title">
                Procurement Workflow Automation
            </div>

            <div className="navbar-user">

                <div className="avatar">
                    {email.charAt(0).toUpperCase()}
                </div>

                <div>

                    <h4>{email}</h4>

                    <p>Logged In</p>

                </div>

            </div>

        </div>

    );

}

export default Navbar;