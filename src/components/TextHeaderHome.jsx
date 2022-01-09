
import {Link} from "react-router-dom"

var data = [
    {
        bookTitle: ""
    }
]

const TextHeaderHome = () => {
    
    

/*
    const consoleInputValue = () => {
        var input = document.querySelector('.search-button-container input'); 
        data[0].bookTitle = input.value;
    }
*/
    const storeTitle = (event) => {
        data[0].bookTitle = event.target.value;
    }

    return ( 
        <div className="home-header-element">
            <div className="text">
                <h1>WYSZUKAJ SWOJĄ<br/>ULUBIONĄ KSIĄŻKĘ </h1>
                <h3>SZUKAJ SPOŚRÓD SETKI DOSTĘPNYCH KSIĄŻEK</h3>
            </div>
            <div className="search-button-container">
                <input type = "text" placeholder="Wprowadź nazwę książki..." onChange = {storeTitle}></input>
                {/*<Link to={ {
                    pathname: "/listaksiążek"
                    }} className="search-btn"  onClick = {() => {consoleInputValue()}}><i className = "fa fa-search"></i></Link>*/}

                    <Link to= {{
                        pathname: "/listaksiążek",
                        state: data
                    }} className= "search-btn" ><i className = "fa fa-search"></i></Link>
            </div>
        </div>
     );
}
 
export default TextHeaderHome;