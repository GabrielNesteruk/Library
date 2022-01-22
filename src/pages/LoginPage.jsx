import { useState } from "react";
import { Redirect } from "react-router";
import { Link } from "react-router-dom";
import "../Styles/LoginPage.css";
import jwt_decode from "jwt-decode";

const LoginPage = ({ isLogged, setIsLogged, createNotification }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(false);

  let loginError = false;

  const handleSumbit = () => {
    if (username === "" || password === "") {
      createNotification("error", "Niepoprawne dane logowania");
      return;
    }

    const data = {
      username: username,
      password: password,
    };

    fetch("http://localhost:8081/login", {
      method: "POST",

      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
      .then((res) => {
        if (res.status !== 200) {
          loginError = true;
        }
        return res.json();
      })
      .then((data) => {
        if (loginError) {
          return;
        }

        var token = data.access_token.substring(6);
        var userToken = jwt_decode(token).sub; //nazwa uzytkownika
        var userRole = jwt_decode(token).authorirites[0].authority; // rola użytkownika

        localStorage.setItem("userToken", userToken); // nazwa uzytkownika w locale storage
        localStorage.setItem("token", token); //token w local storage
        localStorage.setItem("userRole", userRole); //rola tokena w local storage

        fetch(
          "http://localhost:8081/api/members/username/" +
            localStorage.getItem("userToken"),
          {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token"),
              "Content-Type": "application/json",
            },
          }
        )
          .then((res) => {
            return res.json();
          })
          .then((user) => {
            localStorage.setItem("userID", user.id);
            localStorage.setItem("userData", JSON.stringify(user));
          });
      })
      .then(() => {
        if (!loginError) {
          setIsLogged(false);
          setIsLogged(true);
          setRedirect(true);
          console.log("loguje");
        } else {
          createNotification("error", "Niepoprawne dane logowania");
          setRedirect(false);
          setIsLogged(false);
        }
      });
  };

  if (redirect) {
    return <Redirect to="/" />;
  }

  return (
    <div className="loginpage-container">
      <div className="createaccount-label-container">
        <h1>Nie posiadasz konta?</h1>
        <Link to={"/rejestracja"}>
          <button>UTWÓRZ KONTO</button>
        </Link>
      </div>

      <div className="login-panel-container">
        <h1 className="login-panel-header">
          STREFA <br /> UŻYTKOWNIKA
        </h1>
        <div className="login-data-container">
          <div className="login-data">
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

          <div className="login-data">
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
          <div className="login-btn">
            <button onClick={handleSumbit}>ZALOGUJ SIĘ</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
