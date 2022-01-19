import { useEffect, useState } from 'react';
import "../Styles/AdminPanel.css"

function EditMember({editMember, memberParam}) {
    const [member, setMember] = useState({});
    const [selectedType, setSelectedType] = useState('');

    const userTypes = ['User', 'Employee', 'Admin'];

    useEffect(() => {
        console.log(memberParam);
        setMember(memberParam);
    }, [])

    useEffect(() => {
      if(member.types) {
        let highestTypeIndex = 0;
        let positionInArray = 0;
        member.types.forEach((type, index) => {
          if(type.id > highestTypeIndex) {
            highestTypeIndex = type.id;
            positionInArray = index;
          }
        })
        setSelectedType(member.types[positionInArray].typeValue);
      }

  }, [member])

    function memberEdit() {
      editMember(member);
  
      fetch('http://localhost:8081/api/members/' + member.username + '/type/' + selectedType, {
          method: 'PUT'
      }).then(() => {})
    }

    function change(event) {
      let target = event.target.id;
      setMember({
          ...member,
          [target]: event.target.value
      });
    }

    const onChange = (e) => {
      setSelectedType(e.target.value);
    }

    return (
      <div className="adminpanel-container">

        <div className="middle">
          <div className="add-user-panel" style = {{display:  "flex", boxShadow: 'none'}}>
            <h1 className="add-user-headertext">Edytuj <br/> Użytkownika</h1>
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

              {/* <div className="element">
                  <h1>Hasło</h1>
                  <input
                    type="password"
                    className ='password'
                    id = "password"
                    onChange={change}
                  />
              </div> */}

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

              <div style={{marginTop: "10px"}} className="element">
                  <h1>Typ użytkownika:</h1>
                  <p><b>{ selectedType }</b></p>
              </div>

              <div style={{marginTop: "12px"}} className="element">
                  <h1>Zmień typ:</h1>
                  <select onChange={(e) => onChange(e)}>
                    <option value={selectedType}>{selectedType}</option>
                    {
                      userTypes.map(type => {
                        if(!member.types)
                          return '';

                        if(type !== selectedType) {
                          return (
                            <option value={type}>{type}</option>
                          )
                        }
                      })
                    }
                  </select>
              </div>
          </div>

          <button
            className="add-user-btn"
            onClick={memberEdit}
          >
              <h1>EDYTUJ UŻYTKOWNIKA</h1>
          </button>

        </div>
      </div>
    </div>
    );
}

export default EditMember;
