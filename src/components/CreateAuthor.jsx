
import { useState } from "react";
import axios from 'axios';

const CreateAuthor = () => {

    const [authorName, setAuthorName] = useState("");
    const [authorLastName, setAuthorLastName] = useState("");

    const submitForm = (e) => {
        e.preventDefault();

        if(authorName === "" || authorLastName === "") {
            alert("Uzupełnij pola.");
            return;
        }

        const author = {
            firstName: authorName,
            lastName: authorLastName
        };

        postAuthor(author);
        
    }

    function postAuthor(author){
        return axios.post('http://localhost:8081/api/authors', author)
          .then((response) => {
            alert("Dodano nowego autora.");
            setAuthorName("");
            setAuthorLastName("");
            return response;
          })
          .catch((error) => {
              return error;
          });
    }

    return ( 
        <div>

        <div className="booksform-container">
          <div className="booksform-header">
            <h1 className="header-text">UTWÓRZ AUTORA</h1>
            <form onSubmit={submitForm}>
                <div style={{marginTop: "20px"}} className="booksform-input">
                    <label className="booksform-label">IMIĘ</label><br/>
                    <input className="booksform-text" type="text" id="name" value={authorName} onChange={(e) => setAuthorName(e.target.value)}/>
                </div>
                <div style={{marginTop: "20px"}} className="booksform-input">
                    <label className="booksform-label">NAZWISKO</label><br/>
                    <input className="booksform-text" type="text" id="lastName" value={authorLastName} onChange={(e) => setAuthorLastName(e.target.value)}/>
                </div>
                <input className="booksform-button" type="submit" value="Dodaj"/>
            </form>
          </div>
        </div>
  
      </div>
     );
}
 
export default CreateAuthor;