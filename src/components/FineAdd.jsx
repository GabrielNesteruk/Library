import { useState, useEffect } from "react";
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import '../Styles/BookForm.css';

const FineAdd = ({memberLoans, postFine}) => {
  const [submit, setSubmit] = useState(false)
  const [fine, setFine] = useState({
    loanId: '',
    amount: 0,
    // fineDate: new Date(),
  })

  useEffect(() => {
    console.log("FineAdd", memberLoans)
  }, [])

  function validateForm(){
    //kwota wieksza od 0
    if(fine.fineAmount <= 0) {
      console.log("Fine validation failed - fineAmount", fine);
      return false;
    }

    // musi zostać wybrane wypozyczenie
    if(fine.loanId == -1){
      console.log("Fine validation failed - loanId", fine);
      return false;
    }

    return true;
  }

  function onChange(e) {
    var name = e.target.id;
    setFine({
      ...fine,
      [name]: e.target.value,
    });
  }

  function onChangeAmount(e) {
    console.log("Fine change", e.target.value)
    var name = e.target.id;
    setFine({
      ...fine,
      amount: parseInt(e.target.value),
    });
  }

  function submitForm(event) {
    event.preventDefault();

    //jeśli walidacja formularza udana - dodanie ksiazki i przekierowanie do listy
    if (validateForm()) {
      console.log("Fine submit", fine)
      postFine(fine.loanId, fine.amount);
      setSubmit(true);
    }
  }

  return (
    <div>
      { submit &&
        <Redirect to='/pracownikpanel' />
      }

      <div className="booksform-container">
        <div className="booksform-header">
          <h1 className="header-text">NAŁÓŻ OPŁATĘ</h1>
        </div>
        {console.log("render fine")}
        {
          memberLoans &&
          <form onSubmit={submitForm}>
            <div className="booksform-input">
              <label className="booksform-label">WYPOZYCZENIE</label><br/>
              <select id="loanId" onChange={(e) => onChange(e)}>
                <option value="-1">Wybierz wypożyczenie</option>
                {
                  memberLoans.map((loan) => {
                    return (
                      <option value={loan.id} key={loan.id}>
                          Wypożyczenie: {loan.id}
                      </option>
                    );
                  })
                }
              </select>
            </div>
            <div className="booksform-input">
              <label className="booksform-label">KWOTA</label><br/>
              <input className="booksform-text" type="number" placeholder="KWOTA" id="amount" onChange={(e) => onChangeAmount(e)} />
            </div>
            <input className="booksform-button" type="submit" value="Dodaj"/>
          </form>
        }
      </div>

    </div>
  );
}

export default FineAdd;
