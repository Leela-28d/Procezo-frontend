import "./Header.css";

function Header() {

    const email = localStorage.getItem("email");

    return (

        <div className="header">

            <h2>Procurement Workflow Automation</h2>

            <div className="profile">

                <div className="avatar">
                    {email ? email.charAt(0).toUpperCase() : "A"}
                </div>

                <div>
                    <h4>{email}</h4>
                    <p>Logged In</p>
                </div>

            </div>

        </div>

    );

}

export default Header;