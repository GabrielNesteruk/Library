import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import LoansTable from "../components/LoansTable";
import FinesTable from "../components/FinesTable";
import MembersTable from "../components/MembersTable";
import axios from "axios";
import BookAdd from "../components/BookAdd";
import FineAdd from "../components/FineAdd";
import AuthorToBookAdd from "../components/AuthorToBookAdd";
import "../Styles/Account.css";
import "../Styles/EmployeePanel.css";
import CreateCategory from "../components/CreateCategory";
import CreateAuthor from "../components/CreateAuthor";
import DeleteAuthor from "../components/DeleteAuthor";
import DeleteCategory from "../components/DeleteCategory";
import DeleteBook from "../components/DeleteBook";

const EmployeePanel = ({ setIsLogged }) => {
  var userData = JSON.parse(localStorage.getItem("userData"));

  const [membersList, setMembersList] = useState(null);
  const [memberLoans, setMemberLoans] = useState(null);
  const [memberFines, setMemberFines] = useState(null);

  const [selectedMemberId, setSelectedMemberId] = useState(0);
  const [selectedMember, setSelectedMember] = useState(null);
  const [membersClicked, setMembersClicked] = useState(false);
  const [bookAddFormClicked, setBookAddFormClicked] = useState(false);
  const [authorAddFormClicked, setAuthorAddFormClicked] = useState(false);
  const [createCategoryClicked, setCreateCategoryClicked] = useState(false);
  const [createAuthorClicked, setCreateAuthorClicked] = useState(false);
  const [deleteAuthorClicked, setDeleteAuthorClicked] = useState(false);
  const [deleteCategoryClicked, setDeleteCategoryClicked] = useState(false);
  const [deleteBookClicked, setDeleteBookClicked] = useState(false);

  //funkcja wczytująca użytkowników
  const loadMembersList = () => {
    fetch("http://localhost:8081/api/members/", {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
      .then((res) => {
        //console.log(res)
        return res.json();
      })
      .then((members) => {
        //console.log(members)
        setMembersList(members);
      });
  };

  //funkcja wczytująca wypozyczenia uzytkownika przy zmianie uzytkownika
  useEffect(() => {
    loadMemberLoans();
  }, [selectedMember]);

  //funkcja wczytująca wypozyczenia uzytkownika
  const loadMemberLoans = () => {
    fetch("http://localhost:8081/api/loans/members/" + selectedMemberId, {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((loans) => {
        if (loans.length > 0) {
          setMemberLoans(loans);
        } else {
          setMemberLoans(null);
        }
      });
  };

  const loadMemberFineList = (username) => {
    fetch("http://localhost:8081/api/fines/members/" + username, {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((fines) => {
        //console.log("get user fines", fines)
        if (fines.length > 0) {
          setMemberFines(fines);
        } else {
          setMemberFines(null);
        }
      });
  };

  function deleteLoan(loanId) {
    let currentDate = new Date();
    return axios
      .put(
        "http://localhost:8081/api/loans/" +
          loanId +
          "?date=" +
          currentDate.toISOString().split("T")[0]
      )
      .then((response) => {
        loadMemberLoans();
        return response;
      })
      .catch((error) => {
        return error;
      });
  }

  function postFine(loanId, amount) {
    return axios
      .post(
        "http://localhost:8081/api/fines/loans/" + loanId + "?amount=" + amount
      )
      .then((response) => {
        //console.log("response", response.data)
        loadMemberFineList(selectedMember.username);
        return response;
      })
      .catch((error) => {
        return error;
      });
  }

  const usersListClik = (event) => {
    setMembersClicked(true);
    setBookAddFormClicked(false);
    setAuthorAddFormClicked(false);
    loadMembersList();
    setCreateCategoryClicked(false);
    setCreateAuthorClicked(false);
    setDeleteAuthorClicked(false);
    setDeleteCategoryClicked(false);
    setDeleteBookClicked(false);
  };

  const addBookClick = (event) => {
    setMembersClicked(false);
    setBookAddFormClicked(true);
    setAuthorAddFormClicked(false);
    setSelectedMember(null);
    setCreateCategoryClicked(false);
    setCreateAuthorClicked(false);
    setDeleteAuthorClicked(false);
    setDeleteCategoryClicked(false);
    setDeleteBookClicked(false);
  };

  const addAuthorToBookClick = (event) => {
    setMembersClicked(false);
    setBookAddFormClicked(false);
    setAuthorAddFormClicked(true);
    setSelectedMember(null);
    setCreateCategoryClicked(false);
    setCreateAuthorClicked(false);
    setDeleteAuthorClicked(false);
    setDeleteCategoryClicked(false);
    setDeleteBookClicked(false);
  };

  const createCategoryClick = (event) => {
    setMembersClicked(false);
    setBookAddFormClicked(false);
    setAuthorAddFormClicked(false);
    setCreateCategoryClicked(true);
    setSelectedMember(null);
    setCreateAuthorClicked(false);
    setDeleteAuthorClicked(false);
    setDeleteCategoryClicked(false);
    setDeleteBookClicked(false);
  };

  const createAuthorClick = (event) => {
    setMembersClicked(false);
    setBookAddFormClicked(false);
    setAuthorAddFormClicked(false);
    setCreateCategoryClicked(false);
    setSelectedMember(null);
    setCreateAuthorClicked(true);
    setDeleteAuthorClicked(false);
    setDeleteCategoryClicked(false);
    setDeleteBookClicked(false);
  };

  const deleteAuthorClick = (event) => {
    setMembersClicked(false);
    setBookAddFormClicked(false);
    setAuthorAddFormClicked(false);
    setCreateCategoryClicked(false);
    setSelectedMember(null);
    setCreateAuthorClicked(false);
    setDeleteAuthorClicked(true);
    setDeleteCategoryClicked(false);
    setDeleteBookClicked(false);
  };

  const deleteCategoryClick = (event) => {
    setMembersClicked(false);
    setBookAddFormClicked(false);
    setAuthorAddFormClicked(false);
    setCreateCategoryClicked(false);
    setSelectedMember(null);
    setCreateAuthorClicked(false);
    setDeleteAuthorClicked(false);
    setDeleteCategoryClicked(true);
    setDeleteBookClicked(false);
  };

  const deleteBookClick = (event) => {
    setMembersClicked(false);
    setBookAddFormClicked(false);
    setAuthorAddFormClicked(false);
    setCreateCategoryClicked(false);
    setSelectedMember(null);
    setCreateAuthorClicked(false);
    setDeleteAuthorClicked(false);
    setDeleteCategoryClicked(false);
    setDeleteBookClicked(true);
  };

  const selectMember = (id) => {
    window.scrollTo(0, 0);
    setMembersClicked(true);

    let member = membersList.find((el) => el.id == id);
    setSelectedMember(member);
    setSelectedMemberId(member.id);
    loadMemberFineList(member.username);
  };

  return (
    <div className="account-container">
      <div className="left-side">
        <div className="account-div">
          <div className="profile-img">
            <i className="fas fa-user-circle"></i>
          </div>
          <div className="account-info">
            <h1>
              {userData.firstName} {userData.lastName}
            </h1>
            <h3>{userData.username}</h3>
          </div>
        </div>

        <div className="general">
          <h1 className="header-text">OGÓLNE</h1>
          <div className="options">
            <div
              onClick={(e) => usersListClik(e)}
              className="element-loan"
              style={{
                backgroundColor:
                  membersClicked === true
                    ? "rgba(238, 238, 238, 0.397)"
                    : "white",
                borderRight:
                  membersClicked === true
                    ? "3px solid rgba(68, 148, 68)"
                    : "none",
              }}
            >
              <i
                className="fas fa-book"
                style={{
                  color:
                    membersClicked === true
                      ? "rgba(68, 148, 68)"
                      : "rgb(61, 61, 61)",
                }}
              ></i>
              <h1
                style={{
                  color:
                    membersClicked === true
                      ? "rgba(68, 148, 68)"
                      : "rgb(61, 61, 61)",
                }}
              >
                Użytkownicy
              </h1>
            </div>

            <div
              onClick={(e) => addBookClick(e)}
              className="element-book-form"
              style={{
                backgroundColor:
                  bookAddFormClicked === true
                    ? "rgba(238, 238, 238, 0.397)"
                    : "white",
                borderRight:
                  bookAddFormClicked === true
                    ? "3px solid rgba(68, 148, 68)"
                    : "none",
              }}
            >
              <i
                className="fas fa-book"
                style={{
                  color:
                    bookAddFormClicked === true
                      ? "rgba(68, 148, 68)"
                      : "rgb(61, 61, 61)",
                }}
              ></i>
              <h1
                style={{
                  color:
                    bookAddFormClicked === true
                      ? "rgba(68, 148, 68)"
                      : "rgb(61, 61, 61)",
                }}
              >
                Dodaj książkę
              </h1>
            </div>

            <div
              onClick={(e) => addAuthorToBookClick(e)}
              className="element-author-form"
              style={{
                backgroundColor:
                  authorAddFormClicked === true
                    ? "rgba(238, 238, 238, 0.397)"
                    : "white",
                borderRight:
                  authorAddFormClicked === true
                    ? "3px solid rgba(68, 148, 68)"
                    : "none",
              }}
            >
              <i
                className="fas fa-book"
                style={{
                  color:
                    authorAddFormClicked === true
                      ? "rgba(68, 148, 68)"
                      : "rgb(61, 61, 61)",
                }}
              ></i>
              <h1
                style={{
                  color:
                    authorAddFormClicked === true
                      ? "rgba(68, 148, 68)"
                      : "rgb(61, 61, 61)",
                }}
              >
                Dodaj autora do książki
              </h1>
            </div>

            <div
              onClick={(e) => createCategoryClick(e)}
              className="element-author-form"
              style={{
                backgroundColor:
                  createCategoryClicked === true
                    ? "rgba(238, 238, 238, 0.397)"
                    : "white",
                borderRight:
                  createCategoryClicked === true
                    ? "3px solid rgba(68, 148, 68)"
                    : "none",
              }}
            >
              <i
                className="fas fa-book"
                style={{
                  color:
                    createCategoryClicked === true
                      ? "rgba(68, 148, 68)"
                      : "rgb(61, 61, 61)",
                }}
              ></i>
              <h1
                style={{
                  color:
                    createCategoryClicked === true
                      ? "rgba(68, 148, 68)"
                      : "rgb(61, 61, 61)",
                }}
              >
                Utwórz kategorię
              </h1>
            </div>

            <div
              onClick={(e) => createAuthorClick(e)}
              className="element-author-form"
              style={{
                backgroundColor:
                  createAuthorClicked === true
                    ? "rgba(238, 238, 238, 0.397)"
                    : "white",
                borderRight:
                  createAuthorClicked === true
                    ? "3px solid rgba(68, 148, 68)"
                    : "none",
              }}
            >
              <i
                className="fas fa-book"
                style={{
                  color:
                    createAuthorClicked === true
                      ? "rgba(68, 148, 68)"
                      : "rgb(61, 61, 61)",
                }}
              ></i>
              <h1
                style={{
                  color:
                    createAuthorClicked === true
                      ? "rgba(68, 148, 68)"
                      : "rgb(61, 61, 61)",
                }}
              >
                Utwórz autora
              </h1>
            </div>
            <div
              onClick={(e) => deleteAuthorClick(e)}
              className="element-author-form"
              style={{
                backgroundColor:
                  deleteAuthorClicked === true
                    ? "rgba(238, 238, 238, 0.397)"
                    : "white",
                borderRight:
                  deleteAuthorClicked === true
                    ? "3px solid rgba(68, 148, 68)"
                    : "none",
              }}
            >
              <i
                className="fas fa-book"
                style={{
                  color:
                    deleteAuthorClicked === true
                      ? "rgba(68, 148, 68)"
                      : "rgb(61, 61, 61)",
                }}
              ></i>
              <h1
                style={{
                  color:
                    deleteAuthorClicked === true
                      ? "rgba(68, 148, 68)"
                      : "rgb(61, 61, 61)",
                }}
              >
                Usuń autora
              </h1>
            </div>
            <div
              onClick={(e) => deleteCategoryClick(e)}
              className="element-author-form"
              style={{
                backgroundColor:
                  deleteCategoryClicked === true
                    ? "rgba(238, 238, 238, 0.397)"
                    : "white",
                borderRight:
                  deleteCategoryClicked === true
                    ? "3px solid rgba(68, 148, 68)"
                    : "none",
              }}
            >
              <i
                className="fas fa-book"
                style={{
                  color:
                    deleteCategoryClicked === true
                      ? "rgba(68, 148, 68)"
                      : "rgb(61, 61, 61)",
                }}
              ></i>
              <h1
                style={{
                  color:
                    deleteCategoryClicked === true
                      ? "rgba(68, 148, 68)"
                      : "rgb(61, 61, 61)",
                }}
              >
                Usuń kategorie
              </h1>
            </div>
            <div
              onClick={(e) => deleteBookClick(e)}
              className="element-author-form"
              style={{
                backgroundColor:
                  deleteBookClicked === true
                    ? "rgba(238, 238, 238, 0.397)"
                    : "white",
                borderRight:
                  deleteBookClicked === true
                    ? "3px solid rgba(68, 148, 68)"
                    : "none",
              }}
            >
              <i
                className="fas fa-book"
                style={{
                  color:
                    deleteBookClicked === true
                      ? "rgba(68, 148, 68)"
                      : "rgb(61, 61, 61)",
                }}
              ></i>
              <h1
                style={{
                  color:
                    deleteBookClicked === true
                      ? "rgba(68, 148, 68)"
                      : "rgb(61, 61, 61)",
                }}
              >
                Usuń książkę
              </h1>
            </div>
          </div>
        </div>
        <Link
          to={"/logowanie"}
          onClick={() => {
            localStorage.clear();
            setIsLogged(false);
          }}
        >
          <div className="logout-btn">
            <h1>WYLOGUJ SIĘ</h1>
          </div>
        </Link>
      </div>
      <div className="right-side">
        <div className="nestedNav" style={{ height: "100px" }}>
          <Navbar />
        </div>
        {selectedMember && (
          <div className="member-details">
            <h3 className="member-header">
              Użytkownik {selectedMember.username}
            </h3>
            {(memberLoans && (
              <LoansTable
                memberActiveLoansList={memberLoans}
                deleteLoan={deleteLoan}
              />
            )) || <h3 className="no-data-header">Brak wypożyczeń</h3>}
            {(memberFines && (
              <FinesTable
                memberActiveFinesList={memberFines}
                userFines={false}
              />
            )) || <h3 className="no-data-header">Brak kar</h3>}
          </div>
        )}
        {selectedMember && (
          <div className="employee-actions">
            {memberLoans && (
              <FineAdd memberLoans={memberLoans} postFine={postFine} />
            )}
          </div>
        )}

        <div
          className="loans"
          style={{ display: membersClicked === true ? "flex" : "none" }}
        >
          {(membersList && (
            <MembersTable
              membersList={membersList}
              selectMember={selectMember}
            />
          )) || <h3 className="no-data-header">Brak użytkowników</h3>}
        </div>

        <div
          className="book-form"
          style={{ display: bookAddFormClicked === true ? "flex" : "none" }}
        >
          <BookAdd />
        </div>

        <div
          className="author-form"
          style={{ display: authorAddFormClicked === true ? "flex" : "none" }}
        >
          <AuthorToBookAdd />
        </div>

        <div
          className="category-form"
          style={{ display: createCategoryClicked === true ? "flex" : "none" }}
        >
          <CreateCategory />
        </div>

        <div
          className="author-form"
          style={{ display: createAuthorClicked === true ? "flex" : "none" }}
        >
          <CreateAuthor />
        </div>

        <div
          className="author-form"
          style={{ display: deleteAuthorClicked === true ? "flex" : "none" }}
        >
          <DeleteAuthor />
        </div>
        <div
          className="author-form"
          style={{ display: deleteCategoryClicked === true ? "flex" : "none" }}
        >
          <DeleteCategory />
        </div>
        <div
          className="author-form"
          style={{ display: deleteBookClicked === true ? "flex" : "none" }}
        >
          <DeleteBook />
        </div>
      </div>
    </div>
  );
};

export default EmployeePanel;
