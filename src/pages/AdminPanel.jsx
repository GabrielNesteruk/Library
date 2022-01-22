import Navbar from "../components/Navbar";
import { useState } from "react";
import EditMember from "../components/EditMember";
import AddMember from "../components/AddMember";
import Modal from "react-modal";
import "../Styles/AdminPanel.css";
import { useHistory } from "react-router-dom";

Modal.setAppElement("#root");

const modalStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

const AdminPanel = ({ createNotification }) => {
  const [displayUsersClicked, setDisplayUsersClicked] = useState(false);
  const [addUserClicked, setAddUserClicked] = useState(false);
  const history = useHistory();

  //lista użytkowników
  const [userList, setUserList] = useState(null);
  const [newUser, setNewUser] = useState({
    username: "",
    email: "",
    password: "",
    firstName: "",
    lastName: "",
  });
  const [editedUser, setEditedUser] = useState(null);

  const [modalIsOpen, setIsOpen] = useState(false);

  function openEditModal(user) {
    setIsOpen(true);
    setEditedUser(user);
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
  }

  function closeModal() {
    setIsOpen(false);
  }

  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  function validateUser(user) {
    let messages = [];

    console.log(user);

    if (user.username.length > 45) {
      messages.push("Nazwa użytkownika nie może być dłuższa niż.");
    } else {
      if (user.username.length < 3) {
        messages.push("Nazwa użytkownika nie może być krótsza niż.");
      }
    }

    if (!validateEmail(user.email)) {
      messages.push("Nieprawidłowy adres email.");
    }

    if (user.password.length < 6) {
      messages.push("Hasło musi być dłuższe niż 6 znaków.");
    }

    if (user.firstName.length > 45) {
      messages.push("Imię nie może być dłuższe niż 45 znaków.");
    }

    if (user.lastName.length > 45) {
      messages.push("Nazwisko nie może być dłuższe niż 45 znaków.");
    }

    console.log(messages.length);
    if (messages.length > 0) {
      let message = "";
      messages.forEach((e) => {
        message += e;
      });
      createNotification("error", message);
      console.log(message);
      return false;
    }

    return true;
  }

  //funkcja usuwajaca użytkownika
  const userRemove = (userID) => {
    fetch("http://localhost:8081/api/members/deleteById/" + userID, {
      method: "DELETE",
    }).then(() => {
      createNotification("success", "Usunięto użytkownika");
    });
  };

  //funkcja wyświetlająca wszystkich użytkowników
  const loadUsers = () => {
    fetch("http://localhost:8081/api/members", {
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => {
        return res.json();
      })
      .then((users) => {
        setUserList(users);
      });
  };

  //funkcja dodajaca uzytkownika
  const addUser = (user) => {
    console.log(user);
    if (!validateUser(user)) {
      return;
    }

    fetch("http://localhost:8081/api/members", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
    }).then(() => {
      createNotification("success", "Dodano użytkownika");
      window.location.reload(false);
    });
  };

  //funkcja edytująca uzytkownika
  const editUser = (user) => {
    if (user.password == "") {
      user.password = editedUser.password;
    }

    if (!validateUser(user)) {
      return;
    }

    return new Promise((resolve) => {
      fetch("http://localhost:8081/api/members/" + editedUser.username, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user),
      }).then(() => {
        createNotification("success", "Edytowano użytkownika");
        loadUsers();
        closeModal();
        resolve();
      });
    });
  };

  const checkClick = (event) => {
    if (
      event.target.matches(".display-users") ||
      event.target.matches(".fa-users")
    ) {
      loadUsers();
      setDisplayUsersClicked(true);
    }
    if (
      event.target.matches(".add-user") ||
      event.target.matches(".fa-user-plus")
    ) {
      setAddUserClicked(true);
    }
    if (event.target.matches(".header h1")) {
      setDisplayUsersClicked(false);
      setAddUserClicked(false);
      window.location.reload(false);
    }
    if (event.target.matches("td .fa-user-times")) {
      event.target.closest("tr").remove();

      var userID = event.target.closest("tr").firstChild.textContent;
      userRemove(userID);
      //usuwanie po userID
    }

    // if (event.target.matches('.add-user-panel .add-user-btn')){
    //     addUser();
    // }
  };

  const routeChange = () => {
    history.push("/");
  };

  return (
    <div
      className="adminpanel-container"
      id="adminpanel"
      onClick={(e) => {
        checkClick(e);
      }}
    >
      <div className="header">
        <h1>PANEL ADMINISTRATORA</h1>
      </div>
      <div className="middle">
        <div
          className="user-management-panels"
          style={{
            display:
              displayUsersClicked === true || addUserClicked === true
                ? "none"
                : "flex",
          }}
        >
          <div className="add-user">
            <i className="fas fa-user-plus"></i>
          </div>
          <div className="display-users">
            <i className="fas fa-users"></i>
          </div>
        </div>

        <div
          className="add-user-panel"
          style={{ display: addUserClicked === true ? "flex" : "none" }}
        >
          <AddMember addMember={addUser} memberParam={newUser} />
        </div>
        <table
          className="users-table"
          style={{
            display: displayUsersClicked === true ? "inline" : "display",
          }}
        >
          <thead>
            <tr>
              <th>ID</th>
              <th>IMIĘ</th>
              <th>NAZWISKO</th>
              <th>NAZWA UŻYTKOWNIKA</th>
              <th>OPCJE</th>
            </tr>
          </thead>
          <tbody>
            {userList &&
              userList.map((user) => (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.firstName}</td>
                  <td>{user.lastName}</td>
                  <td>{user.username}</td>
                  <td className="tools">
                    <i
                      className="fas fa-user-edit"
                      onClick={(e) => {
                        openEditModal(user);
                      }}
                    ></i>
                    <i className="fas fa-user-times"></i>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>

        <Modal
          isOpen={modalIsOpen}
          onAfterOpen={afterOpenModal}
          onRequestClose={closeModal}
          style={modalStyles}
          contentLabel="Edit member"
        >
          <i className="fas fa-window-close" onClick={closeModal}></i>
          <EditMember editMember={editUser} memberParam={editedUser} />
        </Modal>
      </div>
      <div className="bottom">
        <p
          onClick={routeChange}
          style={{
            color: "white",
            marginTop: "10px",
            fontSize: "20px",
            cursor: "pointer",
          }}
        >
          Powrót
        </p>
      </div>
    </div>
  );
};

export default AdminPanel;
