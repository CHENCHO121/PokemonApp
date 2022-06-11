import axios from "axios";
import { useEffect, useState } from "react";

function MapData(props) {
    let [description, setDes] = useState('');
    let [likedArr, setLikedArr] = useState(JSON.parse(localStorage.getItem('likedArr')) || []);
    let [currentUser, setCurrentUser] = useState(JSON.parse(localStorage.getItem('currentUser')) || {});

    useEffect(() => {
        axios.get('https://api.chucknorris.io/jokes/random')
            .then(res => {
                setDes(res.data.value)
            })
            .catch(err => console.log(err))
    }, [props])

    const like = () => {
        let idx = likedArr.findIndex(elem => elem.id === props.arr[0].id);
        if (idx < 0) {
            props.arr[0].userId = currentUser.id;
            likedArr.push(props.arr[0]);
        }
        localStorage.setItem('likedArr', JSON.stringify(likedArr));
        window.location.reload();
    }

    const dislike = (id) => {
        likedArr = likedArr.filter(elem => elem.id !== id && elem.userId === currentUser.id);
        setLikedArr(likedArr);
        localStorage.setItem('likedArr', JSON.stringify(likedArr));
        window.location.reload();
    }

    return (
        <>
            {props.arr && props.arr.map((elem, idx) => {
                return (
                    <div className="col-3 pokemonDiv m-1" key={idx}>
                        <div className="row">
                            <div className="col m-2">
                                <h3>{elem.name} the Pikachu</h3>
                                <img src={elem.sprites.front_default} width="160px" height="160px" />
                            </div>
                        </div>
                        <div className="row">
                            <h5 className="mb-2">Basic Info</h5>
                            <div className="col-4"><h6><i>Height:{elem.height}</i></h6></div>
                            <div className="col-4"><h6><i>Weight:{elem.weight}</i></h6></div>
                            <div className="col-4"><h6><i>Type:{elem.types[0].type.name}</i></h6></div>
                        </div>
                        <div className="row">
                            <h5 className="mt-3">Description</h5>
                            <h6 className="mt-2">{description}</h6>
                        </div>
                        <div className="row m-5">

                            {currentUser.email ?
                                <div className="col">
                                    {!window.location.href.includes('liked') && <button className="button" onClick={like}>Like</button>}
                                    <button className="button" onClick={() => dislike(elem.id)}>Dislike</button>
                                </div>
                                : 'Login first to like any pokemon.'
                            }
                        </div>
                    </div>
                )
            })
            }
        </>
    );
}

export default MapData;