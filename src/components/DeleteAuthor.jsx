import { useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import axios from "axios";
import "../Styles/BookForm.css";

const DeleteAuthor = () => {
  const [submit, setSubmit] = useState(false);
  const [authorsList, setAuthorsList] = useState(null);
  const [author, setAuthor] = useState({
    authorId: "-1",
  });

  useEffect(() => {
    loadAuthorsList();
  }, []);

  const loadAuthorsList = () => {
    fetch("http://localhost:8081/api/authors/", {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
      .then((res) => {
        console.log(res);
        return res.json();
      })
      .then((authors) => {
        console.log(authors);
        setAuthorsList(authors);
      });
  };

  function onChange(e) {
    console.log("change", e.target.id, e.target.value);
    var name = e.target.id;
    setAuthor({
      [name]: e.target.value,
    });
  }

  function submitForm(event) {
    event.preventDefault();

    if (author.authorId === "-1") return;

    alert("Autor został usunięty.");

    return axios
      .delete("http://localhost:8081/api/authors/" + author.authorId)
      .then((response) => {
        console.log("response", response.data);
        loadAuthorsList();
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
          <h1 className="header-text">USUŃ AUTORA</h1>
        </div>

        {authorsList && (
          <form onSubmit={submitForm}>
            <div className="booksform-input">
              <label className="booksform-label">AUTOR</label>
              <br />
              <select
                style={{ padding: "8px" }}
                id="authorId"
                onChange={(e) => onChange(e)}
              >
                <option value="-1">Wybierz autora</option>
                {authorsList.map((author) => {
                  return (
                    <option value={author.id} key={author.id}>
                      {author.firstName} {author.lastName}
                    </option>
                  );
                })}
              </select>
            </div>

            <input className="booksform-button" type="submit" value="Usuń" />
          </form>
        )}
      </div>
    </div>
  );
};

export default DeleteAuthor;
