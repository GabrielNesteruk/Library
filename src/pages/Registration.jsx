import { useState } from "react";
import { Redirect } from "react-router";
import "../Styles/Registration.css"

const Registration = () => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [password, setPassword] = useState("");

    const [redirect, setRedirect] = useState(false);

   

    const register = () => {
        var member = {
            email: email,
            firstName: firstName,
            lastName: lastName,
            password: password,
            username: username
        }

        fetch('http://localhost:8081/registration', {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(member),     
        }).then(() => {
            setRedirect(true);
        })
    }

    const checkClick = (event) => {
        register();
    }

    if (redirect) {
        return <Redirect to="/" />;
    }
    return ( 
        <div className="registration-container">
            <div className="registration-panel">
                <h1 className = "registration-header">REJESTRACJA</h1>
                <div className="registration-data">
                    <input
                        className="firstname"
                        type="text"
                        placeholder="Imię"
                        onChange={(e) => setFirstName(e.target.value)}
                    />
                    <div className="icon-container">
                        <i className="far fa-user"></i>
                    </div>
                </div>

                <div className="registration-data">
                    <input
                        className="lastname"
                        type="text"
                        placeholder="Nazwisko"
                        onChange={(e) => setLastName(e.target.value)}
                    />
                    <div className="icon-container">
                        <i className="far fa-user"></i>
                    </div>
                </div>

                <div className="registration-data">
                    <input
                        className="email"
                        type="email"
                        placeholder="E-mail"
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <div className="icon-container">
                        <i class="far fa-envelope"></i>
                    </div>
                </div>

                <div className="registration-data">
                    <input
                        className="username"
                        type="text"
                        placeholder="Nazwa Użytkownika"
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <div className="icon-container">
                        <i className="far fa-user"></i>
                    </div>
                </div>

                <div className="registration-data">
                    <input
                        className="password"
                        type="password"
                        placeholder="Hasło"
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <div className="icon-container">
                        <i className="fas fa-key"></i>
                    </div>
                </div>

                <div className="register-btn">
                    <button onClick = {e => {
                checkClick(e);
            }}>ZAREJESTRUJ SIĘ</button>
                </div>

            </div>
        </div>
     );
}
 
export default Registration;