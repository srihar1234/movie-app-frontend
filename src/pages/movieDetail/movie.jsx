/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable react/jsx-no-target-blank */
import React, { useEffect, useState } from "react";
import "./movie.css";
import { useNavigate, useParams } from "react-router-dom";
// import EditForm from "../editMovie/EditForm";

const Movie = () => {
    const [currentMovieDetail, setMovie] = useState(null); 
    // const [isEditing, setIsEditing] = useState(false);

    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        if (id) {
            getData();
            window.scrollTo(0, 0);
        }
    }, [id]);

    const getData = () => {
        fetch(`https://imdb-backend-qm2u.onrender.com/specific/movie/${id}`)
            .then((res) => res.json())
            .then((data) => setMovie(data))
            .catch((error) => console.error('Error fetching movie:', error));
    };

    const handleEditClick = () => {
        navigate(`/edit/${id}`)
    };

    if (!currentMovieDetail) {
        return <div>Loading...</div>; 
    }

    return (
        <div className="movie">
            <div className="movie__intro">
                <img className="movie__backdrop" src={currentMovieDetail.img} />
            </div>
            <div className="movie__detail">
                <div className="movie__detailLeft">
                    <div className="movie__posterBox">
                        <img className="movie__poster" src={currentMovieDetail.img} />
                    </div>
                </div>
                <div className="movie__detailRight">
                    <div className="movie__detailRightTop">
                        <div className="movie__name">{currentMovieDetail ? currentMovieDetail.title : ""}</div>
                        <div className="movie__tagline">{currentMovieDetail ? currentMovieDetail.tagline : ""}</div>
                        <div className="movie__rating">
                            {currentMovieDetail ? currentMovieDetail.vote_average : ""} <i class="fas fa-star" />
                        </div>
                        <div className="movie__releaseDate">{currentMovieDetail ? "Release date: " + currentMovieDetail.release_date : ""}</div>
                        <div className="movie__genres">
                            <div className="synopsisText">PRODUCTION</div>
                            <div>{currentMovieDetail ? currentMovieDetail.prod : ""}</div>
                        </div>
                    </div>
                    <div className="movie__detailRightBottom">
                        <div className="synopsisText">SYNOPSIS</div>
                        <div>{currentMovieDetail ? currentMovieDetail.overview : ""}</div>
                    </div>
                    <div className="movie__detailRightBottom">
                        <div className="synopsisText">LEAD CAST</div>
                        <div>{currentMovieDetail.cast}</div>
                    </div>
                    <button className="editButton" onClick={handleEditClick}>EDIT DETAILS</button> 
                    {/* {isEditing && <EditForm movie={currentMovieDetail} idx={id} className="editForm"/>}  */}
                </div>
            </div>
        </div>
    )
}

export default Movie