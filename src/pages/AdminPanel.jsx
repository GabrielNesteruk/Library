import { useState } from "react";
import "../Styles/AdminPanel.css"



const AdminPanel = () => {

    const [displayUsersClicked, setDisplayUsersClicked] = useState(false);
    const [addUserClicked, setAddUserClicked] = useState(false);

    //inputy
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");

    //lista użytkowników
    const [userList, setUserList] = useState(null);

    //funkcja usuwajaca użytkownika
    const userRemove = (userID) => {
        fetch('http://localhost:8081/api/members/deleteById/'+ userID, {
            method: 'DELETE'
        }).then(() => {
            alert('Usunięto użytkownika');
        })
    }


    //funkcja wyświetlająca wszystkich użytkowników
    const loadUsers = () => {
        fetch('http://localhost:8081/api/members',{
            headers: { "Content-Type": "application/json" }
        }).then(res => {
            return res.json();
        }).then(users => {
            setUserList(users);
        })   
    }

    //funkcja dodajaca uzytkownika 
    const addUser = () => {
        const member = {
            email: email,
            firstName: firstName,
            lastName: lastName,
            password: password,
            username: username
        }

        fetch('http://localhost:8081/api/members', {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(member)
        }).then(() => {
            alert('Dodano użytkownika');
            window.location.reload(false);
        })
    }
    
     const checkClick = (event) => {
        if (event.target.matches('.display-users') || event.target.matches('.fa-users')){
            loadUsers();
            setDisplayUsersClicked(true);
            

        }
        if (event.target.matches('.add-user') || event.target.matches('.fa-user-plus')){
           setAddUserClicked(true);
        }
        if (event.target.matches('.header h1')){
            setDisplayUsersClicked(false);
            setAddUserClicked(false);
            window.location.reload(false);
            
        }
        if (event.target.matches('td .fa-user-edit')){
            //w momencie klikniecia edit powinnismy pobrac cale dane o uzytkowniku o danym id i przypisac ten obiekt do jakiejs zmiennej 
            //nastepnie otwiera sie nam popup do edycji uzytkownika
            //w momencie wprowadzenia nowych danych kazdy input podmieniamy z wartoscia z obiektu
            //jak zapisujemy zmiany, wysylamy caly obiekt
        }
        if (event.target.matches('td .fa-user-times')){

            event.target.closest('tr').remove();

            var userID = event.target.closest('tr').firstChild.textContent;
            userRemove(userID);
            //usuwanie po userID
        }

        if (event.target.matches('.add-user-panel .add-user-btn')){
            addUser();
        }
    }

    return ( 
        <div className="adminpanel-container" onClick= {e => {
            checkClick(e);
        }}>
            <div className="header">
                <h1>PANEL ADMINISTRATORA</h1>
            </div>
            <div className="middle">
                <div className="user-management-panels" style = {{display: displayUsersClicked === true || addUserClicked === true ? "none" : "flex"}}>
                    <div className="add-user">
                        <i className="fas fa-user-plus"></i>
                    </div>
                    <div className="display-users">
                        <i className="fas fa-users"></i>
                    </div>
                </div>

                <div className="add-user-panel" style = {{display: addUserClicked === true ? "flex" : "none"}}>
                    <div className="inputs">
                        <h1 className="add-user-headertext">Dodaj <br/> Użytkownika</h1>
                        <div className="element">
                            <h1>Nazwa Użytkownika <span>*</span></h1>
                            <input type="text" className ='username' onChange = {e => {
                                setUsername(e.target.value)
                            }}/>
                        </div>

                        <div className="element">
                            <h1>E-mail <span>*</span></h1>
                            <input type="email" className ='email' onChange = {e => {
                                setEmail(e.target.value);
                            }}/>
                        </div>

                        <div className="element">
                            <h1>Hasło <span>*</span></h1>
                            <input type="password" className ='password' onChange = {e => {
                                setPassword(e.target.value);
                            }}/>
                        </div>

                        <div className="element">
                            <h1>Imię <span>*</span></h1>
                            <input type="text" className ='name' onChange = {e => {
                                setFirstName(e.target.value)
                            }}/>
                        </div>

                        <div className="element">
                            <h1>Nazwisko <span>*</span></h1>
                            <input type="text" className ='lastname' onChange = {e => {
                                setLastName(e.target.value)
                            }}/>
                        </div>
                    </div>

                    <div className="add-user-btn">
                        <h1>DODAJ UŻYTKOWNIKA</h1>
                    </div>

                </div>

                <table className="users-table" style = {{display: displayUsersClicked === true ? "inline" : "display"}}>
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
                        {userList && userList.map(user =>(
                            <tr key = {user.id}>
                                <td>{user.id}</td>
                                <td>{user.firstName}</td>
                                <td>{user.lastName}</td>
                                <td>{user.username}</td>
                                <td className = "tools">
                                    <i className="fas fa-user-edit"></i>
                                    <i className="fas fa-user-times"></i>
                                </td>
                            </tr>
                        ))}
                        
                    </tbody>
                </table>
            </div>
            <div className="bottom"></div>
        </div>
     );
}
 
export default AdminPanel;