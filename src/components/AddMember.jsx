import { useEffect, useState } from 'react';
import "../Styles/AdminPanel.css"

function AddMember({addMember, memberParam}) {
    const [member, setMember] = useState({});

    useEffect(() => {
        setMember(memberParam);
    }, [])

    function memberAdd() {
      console.log(member);
      addMember(member);
    }

    function change(event) {
      let target = event.target.id;
      setMember({
          ...member,
          [target]: event.target.value
      });
    }

    return (
      <div className="adminpanel-container">
        <div className="middle">
          <div className="add-user-panel" style = {{display:  "flex", boxShadow: 'none'}}>
            <h1 className="add-user-headertext">Dodaj <br/> Użytkownika</h1>
            <div className="inputs">
              <div className="element">
                  <h1>Nazwa Użytkownika</h1>
                  <input
                    type="text"
                    className ='username'
                    id = "username"
                    defaultValue={member.username}
                    onChange={change}
                  />
              </div>

              <div className="element">
                  <h1>E-mail <span>*</span></h1>
                  <input
                    type="email"
                    className ='email'
                    id = "email"
                    defaultValue={member.email}
                    onChange={change}
                  />
              </div>

              <div className="element">
                  <h1>Hasło</h1>
                  <input
                    type="password"
                    className ='password'
                    id = "password"
                    onChange={change}
                  />
              </div>

              <div className="element">
                  <h1>Imię</h1>
                  <input
                    type="text"
                    className ='name'
                    id = "firstName"
                    defaultValue={member.firstName}
                    onChange={change}
                  />
              </div>

              <div className="element">
                  <h1>Nazwisko</h1>
                  <input
                    type="text"
                    className ='lastname'
                    id = "lastName"
                    defaultValue={member.lastName}
                    onChange={change}
                  />
              </div>
          </div>

          <button
            className="add-user-btn"
            onClick={memberAdd}
          >
              <h1>DODAJ UŻYTKOWNIKA</h1>
          </button>

        </div>
      </div>
    </div>
    );
}

export default AddMember;
