import Navbar from "../components/Navbar";
import {Link} from "react-router-dom"
import { useEffect} from "react";


const Home = ({setTitle, setBooksList, searchByString}) => {


    useEffect(()=>{
        setTitle("");
        searchByString(true);
    },[])


    const storeTitle = (event) => {
        const titleInput = event.target.value;
        setTitle(titleInput);
    }

    return (
        <div className="home-container">
            <Navbar/>
            <div className="home-header">
                <div className="home-header-img"></div>
                {/*<TextHeaderHome/>*/}

                <div className="home-header-element">
                    <div className="text">
                        <h1>WYSZUKAJ SWOJĄ<br/>ULUBIONĄ KSIĄŻKĘ </h1>
                        <h3>SZUKAJ SPOŚRÓD SETKI DOSTĘPNYCH KSIĄŻEK </h3>
                    </div>
                    <div className="search-button-container">
                        <input type = "text" placeholder="Wprowadź nazwę książki..." onChange = {storeTitle}></input>
                        {/*<Link to={ {
                            pathname: "/listaksiążek"
                            }} className="search-btn"  onClick = {() => {consoleInputValue()}}><i className = "fa fa-search"></i></Link>*/}

                            <Link to= {'/listaksiążek'} className= "search-btn" onClick = {() => {
                                setBooksList(null);
                            }}><i className = "fa fa-search"></i></Link>
                    </div>
                </div>

            </div>
        </div>
      );
}

export default Home;
