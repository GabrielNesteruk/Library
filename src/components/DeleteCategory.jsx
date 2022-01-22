import { useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import axios from "axios";
import "../Styles/BookForm.css";

const DeleteCategory = () => {
  const [categoryList, setCategoryList] = useState(null);
  const [category, setCategory] = useState({
    categoryId: "-1",
  });

  useEffect(() => {
    loadCategoriesList();
  }, []);

  const loadCategoriesList = () => {
    fetch("http://localhost:8081/api/categories/", {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
      .then((res) => {
        console.log(res);
        return res.json();
      })
      .then((categories) => {
        console.log(categories);
        setCategoryList(categories);
      });
  };

  function onChange(e) {
    console.log("change", e.target.id, e.target.value);
    var name = e.target.id;
    setCategory({
      [name]: e.target.value,
    });
  }

  function submitForm(event) {
    event.preventDefault();

    if (category.categoryId === "-1") return;

    alert("Kategoria usunięta.");

    return axios
      .delete("http://localhost:8081/api/categories/" + category.categoryId)
      .then((response) => {
        console.log("response", response.data);
        loadCategoriesList();
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
          <h1 className="header-text">USUŃ KATEGORIE</h1>
        </div>

        {categoryList && (
          <form onSubmit={submitForm}>
            <div className="booksform-input">
              <label className="booksform-label">KATEGORIA</label>
              <br />
              <select
                style={{ padding: "8px" }}
                id="categoryId"
                onChange={(e) => onChange(e)}
              >
                <option value="-1">Wybierz kategorie</option>
                {categoryList.map((category) => {
                  return (
                    <option value={category.id} key={category.id}>
                      {category.categoryName}
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

export default DeleteCategory;
