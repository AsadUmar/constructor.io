import logo from './logo.svg';
import './App.css';
import {useEffect, useState} from "react";


const PAGE_SIZE = 10

function makeURL(pageSize, pageNumber, search = 'apple') {
    const url = `https://ac.cnstrc.com/search/${search}?key=key_fygjntHGW7usvxC8`
    return url + `&page=${pageNumber}&num_results_per_page=${pageSize}`
}

function GetSet(state) {
    return {
        get: state[0],
        set: state[1]
    }
}

function App() {
    const [data, setData] = useState(undefined)
    const [search, setSearch] = useState('')
    const page = GetSet(useState(1))
    useEffect(
        () => {
            fetch(makeURL(PAGE_SIZE, page.get, search))
                .then(e => e.json())
                .then(e => setData(e.response.results))
        }, [page.get, search])

    function onClick(num) {
        if (page.get >= 0 && num === -1) {
            return
        }

        page.set(page.get + num)
    }

    if (!data) {
        return <div className='loader-container'>
            <div className='loader'>Loading...</div>
        </div>
    }

    return (
        <div>
            <input onChange={(e) => setSearch(e.target.value)}/>
            <h1>{data.map(e => {
                return <Cards
                    key={e.data.id}
                    state={e}/>
            })}
            </h1>
            <div className='nav'>
                <div className='prev' onClick={() => onClick(-1)}>Prev</div>
                <div className='next' onClick={() => onClick(1)}>Next</div>
            </div>
        </div>

    );
}

function Cards(props) {
    return <div className='container'>
        <h3 className='head'>{props.state.value}</h3>
        <div className='image'>
            <img loading={'lazy'} className='image' src={props.state.data.image_url}/>
        </div>
    </div>
}

export default App;
