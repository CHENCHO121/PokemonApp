import MapData from "./mapData";
import { useEffect, useState } from "react";

function LikedPokemons() {
    let [currentUser, setCurrentUser] = useState(JSON.parse(localStorage.getItem('currentUser')) || {});
    let [likedArr, setLikedArr] = useState(JSON.parse(localStorage.getItem('likedArr')) || []);
    let [myPokes, setMyPokes] = useState([]);
    let [bol, setBol] = useState(false);
    
    useEffect(() => {
        let arr = likedArr.filter(elem => elem.userId === currentUser.id);
        setMyPokes(arr); 
        setBol(true);
    }, [])

    return (
        <>
            <div className="container">
                <div className="row">
                <h1 style={{textAlign: 'left', margin: '2%'}}>Liked Pokemons</h1>
                    {bol && myPokes.length >= 1 ? <MapData arr={myPokes} /> : "You have not liked any pokemon yet."}
                </div>
            </div>
        </>
    )
}

export default LikedPokemons;