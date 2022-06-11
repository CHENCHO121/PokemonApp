import { useEffect, useState } from 'react';
import './CSS/home.css';
import MapData from './mapData';
import axios from 'axios';

function Home() {
    let [data, setData] = useState([]);
    let [bol, setBol] = useState(false);
    let [regions, setRegions] = useState([]);
    let [types, setTypes] = useState([]);
    let [region, setRegion] = useState('');
    let [type, setType] = useState('');

    useEffect(() => {
        let reg = ['Kanto', 'Johto', 'Hoenn', 'Sinnoh', 'Unova', 'Kalas', 'Alola', 'Galar'];
        setRegions(reg);

        let typ = ['Grass', 'Bug', 'Dark', 'Dragon', 'Electric', 'Fairy', 'Fighting', 'Fire', 'Flying', 'Ghost', 'Ground', 'Ice', 'Normal', 'Poison', 'Psychic', 'Rock', 'Steel', 'Water']
        setTypes(typ);
    }, [])

    const filterByType = (e) => {
        setBol(false);
        setType(e.target.value);
        let k = e.target.value.toLowerCase();
        axios.get(`https://pokeapi.co/api/v2/type/${k}`)
        .then(res => {
            let num = Math.floor(Math.random() * res.data.pokemon.length);
            axios.get(res.data.pokemon[num].pokemon.url)
            .then(res => {
                let arr = [];
                arr.push(res.data);
                setData(arr);
                setBol(true);
            })
            .catch(err => console.log(err))
        })
        .catch(err => console.log(err))
    }

    const filterByRegion = (e) => {
        setRegion(e.target.value);
        let num = 0;
        switch (region) {
            case 'Kanto':
                num = getRandomArbitrary(1, 151);
                break;

            case 'Johto':
                num = getRandomArbitrary(152, 251);
                break;

            case 'Hoenn':
                num = getRandomArbitrary(252, 386);
                break;

            case 'Sinnoh':
                num = getRandomArbitrary(387, 494);
                break;

            case 'Unova':
                num = getRandomArbitrary(495, 649);
                break;

            case 'Kalos':
                num = getRandomArbitrary(650, 721);
                break;

            case 'Alola':
                num = getRandomArbitrary(722, 809);
                break;

            case 'Galar':
                num = getRandomArbitrary(810, 898);
        }
        if(num >= 0) getPokemon(num);
    }

    const getRandomArbitrary = (min, max) => {
        return Math.floor(Math.random() * (max - min) + min);
    }

    useEffect(() => {
        let num = Math.floor(Math.random() * 899);
        getPokemon(num);
    }, [])

    const getPokemon = (num) => {
        axios.get(`https://pokeapi.co/api/v2/pokemon/${num}/`)
        .then(res => {
            let arr = [];
            arr.push(res.data);
            setData(arr);
            setBol(true);
        })
        .catch(err => console.log(err))
    }

    return (
        <>
            <div className="container">
                <div className="row">
                    <div className="col-6 mt-2">
                        <h4>Filter By Types</h4>
                        <select className="form-control ddl" value={type} onChange={(e) => filterByType(e)}>
                            <option value="0">Select Type</option>
                            {types.map((elem, idx) => {
                                return <option key={idx} value={elem}>{elem}</option>
                            })}
                        </select>
                    </div>
                    <div className="col-6 mt-2">
                        <h4>Filter By Region</h4>
                        <select className="form-control ddl" value={region} onChange={(e) => filterByRegion(e)}>
                            <option value="0">Select Region</option>
                            {regions.map((elem, idx) => {
                                return <option key={idx} value={elem}>{elem}</option>
                            })}
                        </select>
                    </div>
                </div>

                <div className="row">
                    <div style={{ margin: "3% 35%" }}>
                        {bol && <MapData arr={data} />}
                    </div>
                </div>
            </div>
        </>
    )
}

export default Home;