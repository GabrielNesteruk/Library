import { Link } from "react-router-dom";
const Navbar = () => {

    var navLinksMenu;

    if(localStorage.getItem("userRole") === "User"){
        navLinksMenu = (
            <ul className = "navlinks">
                <li className="link"><Link to={'/'}>Strona Główna</Link></li>
                <li className="link"><Link to={'/obibliotece'}>O Bibliotece</Link></li>
                <li className="link"><Link to={'/książki'}>Książki</Link></li>
                <li className="link"><Link to={'/kontakt'}>Kontakt</Link></li>
                <li className="link">
                    <Link to={'/konto'}>
                            Moje Konto
                            <i className="far fa-user"></i>
                    </Link>
                </li>

            </ul>
        )
    }else if (localStorage.getItem("userRole") === "Employee"){
        navLinksMenu = (
            <ul className = "navlinks">
                <li className="link"><Link to={'/'}>Strona Główna</Link></li>
                <li className="link"><Link to={'/obibliotece'}>O Bibliotece</Link></li>
                <li className="link"><Link to={'/książki'}>Książki</Link></li>
                <li className="link"><Link to={'/kontakt'}>Kontakt</Link></li>
                <li className="link"><Link to={'/pracownikpanel'}>Panel Pracownika</Link></li>
                <li className="link">
                    <Link to={'/konto'}>
                            Moje Konto
                            <i className="far fa-user"></i>
                    </Link>
                </li>
            </ul>
        )
    }else if (localStorage.getItem("userRole") === "Admin"){
        navLinksMenu = (
            <ul className = "navlinks">
                <li className="link"><Link to={'/'}>Strona Główna</Link></li>
                <li className="link"><Link to={'/obibliotece'}>O Bibliotece</Link></li>
                <li className="link"><Link to={'/książki'}>Książki</Link></li>
                <li className="link"><Link to={'/kontakt'}>Kontakt</Link></li>
                <li className="link"><Link to={'/adminpanel'}>Panel Admina</Link></li>
                <li className="link">
                    <Link to={'/konto'}>
                            Moje Konto
                            <i className="far fa-user"></i>
                    </Link>
                </li>
            </ul>
        )}else{
        navLinksMenu = (
            <ul className = "navlinks">
                <li className="link"><Link to={'/'}>Strona Główna</Link></li>
                <li className="link"><Link to={'/obibliotece'}>O Bibliotece</Link></li>
                <li className="link"><Link to={'/książki'}>Książki</Link></li>
                <li className="link"><Link to={'/kontakt'}>Kontakt</Link></li>
                <li className="link"><Link to={'/logowanie'} >Logowanie</Link></li>
            </ul>
        )}


    return (
        <section className= "nav">
            {navLinksMenu}
        </section>
     );
}

export default Navbar;
