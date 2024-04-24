import React, {useEffect, useState} from "react"
import "./movieList.css"
import axios from "axios"
import Cards from "../card/card"

const MovieList = () => {
    
    const [ popularMovies, setPopularMovies ] = useState([])

    useEffect(() => {
        axios.get('https://imdb-backend-qm2u.onrender.com/movies')
        .then(response => {
            setPopularMovies(response.data);
        })
        .catch(error => {
            console.error('Error fetching popular movies:', error);
        });
    }, [])

    return (
        <div className="movie__list">
            <h2 className="list__title">FAVOURITES</h2>
            <div className="list__cards">
                {
                    popularMovies.map((movie,idx) => (
                        <Cards key={idx} movie={movie} idx={idx}/>
                    ))
                }
            </div>
        </div>
    )
}

export default MovieList