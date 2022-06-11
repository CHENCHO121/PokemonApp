import { Link } from "react-router-dom";
import { useState } from "react";

function Navbar() {
    let [currentUser, setCurrentUser] = useState(JSON.parse(localStorage.getItem('currentUser')) || {});
    
    const getClass = (id) => {
        let list = document.querySelectorAll('.nav-link');
        list.forEach(elem => {
            elem.classList.remove('active');
            document.getElementById(id).classList.add('active');
        });
    }
    
    return (
        <>
            <ul className="nav justify-content-end">
                <li className="nav-item">
                    <Link className="nav-link active" to="/" id="home" onClick={() => getClass('home')}>Home</Link>
                </li>
                {currentUser.email && <li className="nav-item">
                    <Link className="nav-link" to="/likedPokemons" id="likedPokemons" onClick={() => getClass('likedPokemons')}>Liked Pokemons</Link>
                </li>}
                <li className="nav-item">
                    <Link className="nav-link" to="/login" id="login" onClick={() => getClass('login')}>Login</Link>
                </li>
            </ul>
        </>
    )
}

export default Navbar;