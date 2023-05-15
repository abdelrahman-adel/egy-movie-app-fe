import React, { useState } from "react";

import './App.css'
import SearchIcon from "./search.svg"
import { MovieCard } from "./MovieCard";

// API Key 9c347a1c

const App = () => {

    const [movies, setMovies] = useState([]);
    const [searchText, setSearchText] = useState("");
    const [currPage, setCurrPage] = useState(1);
    const [showNextPrevBtns, setShowNextPrevBtns] = useState(false);

    const API_URL = "https://www.omdbapi.com/?apikey=9c347a1c"

    const searchMovies = async (title, page = 1) => {
        const response = title ? await fetch(`${API_URL}&s=${title}&page=${page}`) : await fetch(API_URL);
        const data = await response.json();

        setMovies(data.Search);
        setShowNextPrevBtns(data?.totalResults > 10 ? true : false);
    };

    return (
        <div className="app">
            <h1>Egy Movie Land</h1>

            <div className="search">
                <input
                    placeholder="Search for movies you want"
                    value={searchText}
                    onChange={(event) => setSearchText(event.target.value)}
                />
                <img src={SearchIcon} alt="Search" onClick={() => searchMovies(searchText)} />
            </div>

            {
                movies?.length > 0 ?
                    <div className="container">
                        {
                            movies.map(movie => (
                                <MovieCard movie={movie} />
                            ))
                        }
                    </div>
                    :
                    <div className="empty">
                        <h2>No movies found!!</h2>
                    </div>
            }
            {
                showNextPrevBtns ?
                    <div className="container">
                        <div className="search" >
                            <button onClick={() => {
                                setCurrPage(currPage => currPage + 1);
                                searchMovies(searchText, currPage + 1);
                            }}>Next Page</button>
                        </div>
                        <div className="empty">
                            <h2>Page: {currPage}</h2>
                        </div>
                        <div className="search" >
                            <button onClick={() => {
                                setCurrPage(currPage => currPage - 1);
                                searchMovies(searchText, currPage - 1);
                            }}>Previous Page</button>
                        </div>
                    </div>
                    :
                    <></>
            }
        </div>
    );
}

export default App;