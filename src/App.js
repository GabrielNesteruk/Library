import { BrowserRouter as Router, Route } from "react-router-dom";
import Books from "./pages/Books";
import BookAdd from "./components/BookAdd";
import Home from "./pages/Home";
import BooksList from "./pages/BooksList";
import LoginPage from "./pages/LoginPage";
import { useEffect, useState } from "react";
import Registration from "./pages/Registration";
import EmployeePanel from "./pages/EmployeePanel";
import AdminPanel from "./pages/AdminPanel";
import Account from "./pages/Account";

import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";
import "react-notifications/lib/notifications.css";
import "react-confirm-alert/src/react-confirm-alert.css";

function App() {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [isLogged, setIsLogged] = useState(false);
  const [booksList, setBooksList] = useState(null);
  const [searchBooksByString, setSearchTypeToString] = useState(true);

  //przechowuje dane o uzytkowniku
  const [userData, setUserData] = useState(null);

  // useEffect(() => {
  //   if (isLogged === true) {
  //     fetch(
  //       "http://localhost:8081/api/members/username/" +
  //         localStorage.getItem("userToken"),
  //       {
  //         headers: {
  //           Authorization: "Bearer " + localStorage.getItem("token"),
  //           "Content-Type": "application/json",
  //         },
  //       }
  //     )
  //       .then((res) => {
  //         return res.json();
  //       })
  //       .then((user) => {
  //         localStorage.setItem("userID", user.id);
  //         localStorage.setItem("userData", JSON.stringify(user));
  //         console.log("pobieram");
  //       });
  //   }
  // }, [isLogged]);

  useEffect(() => {
    if (localStorage.getItem("userToken") !== null) {
      setIsLogged(true);
      console.log("AKTUALIZUJE LOGOWANIE");
    }
  }, []);

  const createNotification = (type, message) => {
    switch (type) {
      case "info":
        NotificationManager.info(message);
        break;
      case "success":
        NotificationManager.success(message, "Success");
        break;
      case "warning":
        NotificationManager.warning(message, "Warning");
        break;
      case "error":
        NotificationManager.error(message, "Error");
        break;
    }
  };

  return (
    <div className="App">
      <NotificationContainer />

      <Router>
        <Route exact path="/">
          <Home
            title={title}
            setTitle={setTitle}
            setBooksList={setBooksList}
            searchByString={setSearchTypeToString}
          />
        </Route>
        <Route exact path="/książki">
          <Books
            categoryFilter={setCategory}
            searchByString={setSearchTypeToString}
          />
        </Route>
        <Route exact path="/książki/dodaj">
          <BookAdd />
        </Route>
        <Route exact path="/listaksiążek">
          <BooksList
            title={title}
            categoryFilter={category}
            booksList={booksList}
            setBooksList={setBooksList}
            createNotification={createNotification}
            searchByString={searchBooksByString}
          />
        </Route>
        <Route exact path="/logowanie">
          <LoginPage
            isLogged={isLogged}
            setIsLogged={setIsLogged}
            createNotification={createNotification}
          />
        </Route>
        <Route exact path="/rejestracja">
          <Registration />
        </Route>
        <Route exact path="/pracownikpanel">
          {isLogged ? (
            <EmployeePanel setIsLogged={setIsLogged} />
          ) : (
            <h2>Niezalogowano</h2>
          )}
        </Route>
        <Route exact path="/adminpanel">
          {isLogged ? (
            <AdminPanel createNotification={createNotification} />
          ) : (
            <h2>Niezalogowano</h2>
          )}
        </Route>
        <Route exact path="/konto">
          {isLogged ? (
            <Account setIsLogged={setIsLogged} />
          ) : (
            <h2>Niezalogowano</h2>
          )}
        </Route>
      </Router>
    </div>
  );
}

export default App;
