import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import FinesTable from "../components/FinesTable";
import LoansTable from "../components/LoansTable";
import "../Styles/Account.css"

const Account = ({setIsLogged}) => {

    var userData = JSON.parse(localStorage.getItem("userData"));

    const [memberActiveLoansList, setMemberActiveLoansList] = useState([]);
    const [memberFines, setMemberFines] = useState([]);

    const [loanClicked, setLoanClicked] = useState(true);
    const [fineClicked, setFineClicked] = useState(false);

    //funkcja wczytująca aktywne wypozyczenia uzytkownika
    const fetchLoans = async () => {
        const res = await fetch('http://localhost:8081/api/loans/members/' + userData.id, {
            headers: {
                "Content-Type": "application/json",
                Authorization: 'Bearer ' + localStorage.getItem('token')
             }
        });
        const data = await res.json();
        return data;
    }

    useEffect(() => {
        const getLoans = async () => {
            const activeLoans = await fetchLoans();
            setMemberActiveLoansList(activeLoans);
        };
        getLoans();
    }, []);

    //funkcja wczytująca opłaty uzytkownika

    const fetchFines = async () => {
        const res = await fetch('http://localhost:8081/api/fines/members/' + userData.username, {
            headers: {
                "Content-Type": "application/json",
                Authorization: 'Bearer ' + localStorage.getItem('token')
             }
        });
        const data = await res.json();
        return data;
    }

    useEffect(() => {
        const getFines = async () => {
            const fines = await fetchFines();
            setMemberFines(fines);
        };
        getFines();
    }, []);


    const loanClick = (e) => {
        setFineClicked(false);
        setLoanClicked(true);
    }

    const fineClick = (e) => {
        setLoanClicked(false);
        setFineClicked(true);
    }

    return (
        <div className="account-container">
            <div className="left-side">
                <div className="account-div">
                    <div className="profile-img">
                        <i className="fas fa-user-circle"></i>
                    </div>
                    <div className="account-info">
                        <h1>{userData.firstName} {userData.lastName}</h1>
                        <h3>{userData.username}</h3>
                    </div>
                </div>

                <div className="general">
                    <h1 className="header-text">OGÓLNE</h1>
                    <div className="options">

                        <div onClick = {e => loanClick(e)} className="element-loan" style = {{backgroundColor: loanClicked === true ? 'rgba(238, 238, 238, 0.397)' : 'white', borderRight: loanClicked === true ? '3px solid rgba(68, 148, 68)' : 'none' }} >
                            <i className="fas fa-book" style = {{color: loanClicked === true ? 'rgba(68, 148, 68)' : 'rgb(61, 61, 61)'}}></i>
                            <h1 style = {{color: loanClicked === true ? 'rgba(68, 148, 68)' : 'rgb(61, 61, 61)'}}>Wypożyczenia</h1>
                        </div>

                        <div onClick = {e => fineClick(e)} className="element-fine" style = {{backgroundColor: fineClicked === true ? 'rgba(238, 238, 238, 0.397)' : 'white', borderRight: fineClicked === true ? '3px solid rgba(68, 148, 68)' : 'none' }}>
                            <i className="fas fa-coins" style = {{color: fineClicked === true ? 'rgba(68, 148, 68)' : 'rgb(61, 61, 61)'}}></i>
                            <h1 style = {{color: fineClicked === true ? 'rgba(68, 148, 68)' : 'rgb(61, 61, 61)'}}>Opłaty</h1>
                        </div>

                    </div>
                </div>
                <Link to={'/logowanie'}  onClick = {() => {localStorage.clear(); setIsLogged(false);}}>
                    <div className="logout-btn">
                        <h1>WYLOGUJ SIĘ</h1>
                    </div>
                </Link>

            </div>
            <div className="right-side">
                <div className="loans" style = {{display: loanClicked === true ? 'flex' : 'none'}}>
                    <LoansTable memberActiveLoansList = {memberActiveLoansList} deleteLoan={false}/>
                </div>
                <div className="fines" style = {{display: fineClicked === true ? 'flex' : 'none'}}>
                    <FinesTable memberActiveFinesList={memberFines} setMemberFines={setMemberFines} userFines={true}/>
                </div>
            </div>
        </div>
     );
}

export default Account;
