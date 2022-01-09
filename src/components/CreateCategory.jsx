
import { useState } from "react";
import axios from 'axios';

const CreateCategory = () => {

    const [categoryName, setCategoryName] = useState("");

    const submitForm = (e) => {
        e.preventDefault();

        if(categoryName === "") {
            alert("Uzupełnij nazwę kategorii");
            return;
        }

        const category = {
            categoryName: categoryName,
        };

        postCategory(category);
        
    }

    function postCategory(category){
        return axios.post('http://localhost:8081/api/categories', category)
          .then((response) => {
            alert("Dodano nową kategorię.");
            setCategoryName("");
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
            <h1 className="header-text">UTWÓRZ KATEGORIĘ</h1>
            <form onSubmit={submitForm}>
                <div style={{marginTop: "20px"}} className="booksform-input">
                    <label className="booksform-label">NAZWA KATEGORII</label><br/>
                    <input className="booksform-text" type="text" id="category" value={categoryName} onChange={(e) => setCategoryName(e.target.value)}/>
                </div>
                <input className="booksform-button" type="submit" value="Dodaj"/>
            </form>
          </div>
        </div>
  
      </div>
     );
}
 
export default CreateCategory;