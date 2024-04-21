/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState,useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const EditForm = () => {

  const [movie, setMovie] = useState(null);   
  const { idx } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (idx) {
        getData();
        window.scrollTo(0, 0);
    }
}, [idx]);

const getData = () => {
    fetch(`https://imdb-backend-qm2u.onrender.com/specific/movie/${idx}`)
        .then((res) => res.json())
        .then((data) => setMovie(data))
        .catch((error) => console.error('Error fetching movie:', error));
};

const [formData, setFormData] = useState({
  title: '',
  release_date: '',
  vote_average: '',
  overview: '',
  cast: '',
  prod: '',
  img: '',
});

useEffect(() => {
  if (movie) {
    setFormData({
      title: movie.title,
      release_date: movie.release_date,
      vote_average: movie.vote_average,
      overview: movie.overview,
      cast: movie.cast,
      prod: movie.prod,
      img: movie.img,
    });
  }
}, [movie]);

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await axios.put(`https://imdb-backend-qm2u.onrender.com/update/movie/${idx}`, formData);
  
      if (response.status === 200) {
        alert('Movie updated successfully!');
        navigate(`/movie/${idx}`);
      }
    } catch (error) {
      console.error('Error updating movie:', error);
      alert('Failed to update movie. Please try again later.');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div className="form-container">
      <h2>Edit Movie</h2>
      <form onSubmit={handleSubmit}>
        <label>Title:</label>
        <input type="text" name="title" value={formData.title} onChange={handleChange} />
        <br />
        <label>Release Year:</label>
        <input type="text" name="release_date" value={formData.release_date} onChange={handleChange} />
        <br />
        <label>Your Vote:</label>
        <input type="text" name="vote_average" value={formData.vote_average} onChange={handleChange} />
        <br />
        <label>Plot:</label>
        <textarea name="overview" value={formData.overview} onChange={handleChange} />
        <br />
        <label>Lead Cast:</label>
        <input type="text" name="cast" value={formData.cast} onChange={handleChange} />
        <br />
        <label>Production Company:</label>
        <input type="text" name="prod" value={formData.prod} onChange={handleChange} />
        <br />
        <label>Poster Image Address:</label>
        <input type="text" name="img" value={formData.img} onChange={handleChange} />
        <br />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default EditForm;
