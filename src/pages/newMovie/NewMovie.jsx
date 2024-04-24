import React, { useEffect } from 'react';
import { useState } from 'react';
import "../newMovie/NewMovie.css";
import axios from "axios";

const NewMovie = () => {
  
  const [ movies, setMovies ] = useState([]);
  const [formData, setFormData] = useState({
    title: '',
    release_date: '',
    vote_average: '',
    overview: '',
    cast: '',
    prod: '',
    img: '',
  });
  const [showNewCastInput, setShowNewCastInput] = useState(false);
  const [showNewProdInput, setShowNewProdInput] = useState(false);

  useEffect(() => {
    axios.get('https://imdb-backend-qm2u.onrender.com/movies')
    .then(response => {
        setMovies(response.data);
    })
    .catch(error => {
        console.error('Error fetching popular movies:', error);
    });
}, []);


const handleSubmit = async (e) => {
  e.preventDefault();

  const isAnyFieldEmpty = Object.values(formData).some(value => value === '');

  if (isAnyFieldEmpty) {
    alert('Please fill in all fields before submitting.');
    return;
  }

  try {
    const response = await axios.post('https://imdb-backend-qm2u.onrender.com/add/movie', formData);

    if (response.status === 201) {
      setFormData({
        title: '',
        release_date: '',
        vote_average: '',
        overview: '',
        cast: '',
        prod: '',
        img: '',
      });
      if (response.data && response.data.includes('successfully')) {
        alert('Movie added successfully!');
      } else {
        alert('Movie added successfully!');
      }
    }
  } catch (error) {
    console.error('Error adding movie:', error);
    alert('Failed to add movie. Please try again later.');
  }
};

  

  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCastChange = (e) => {
    const value = e.target.value;
    setFormData({ ...formData, cast: value });
    if (value === "Other") {
      setShowNewCastInput(true);
    } else {
      setShowNewCastInput(false);
    }
  };

  const handleProdChange = (e) => {
    const value = e.target.value;
    setFormData({ ...formData, prod: value });
    if (value === "Other") {
      setShowNewProdInput(true);
    } else {
      setShowNewProdInput(false);
    }
  };


  const getUniqueValues = (array, key) => {
    return [...new Set(array.map(item => item[key]))];
  };

  return (
    <div className="form-container">
      <h2>Add New Movie</h2>
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
        <div className="select-container">
          <label>Lead Cast:</label>
          <select name="cast" value={formData.cast} onChange={handleCastChange}>
            <option value="">Select lead cast</option>
            {getUniqueValues(movies, 'cast').map((option, idx) => (
              <option key={idx} value={option}>{option}</option>
            ))}
            <option value="Other">Other</option>
          </select>
          {showNewCastInput && (
            <input type="text" placeholder="Enter new cast" name="cast" onChange={handleChange} />
          )}
          <br />
          <label>Production Company:</label>
          <select name="prod" value={formData.prod} onChange={handleProdChange}>
            <option value="">Select Production</option>
            {getUniqueValues(movies, 'prod').map((option, idx) => (
              <option key={idx} value={option}>{option}</option>
            ))}
            <option value="Other">Other</option>
          </select>
          {showNewProdInput && (
            <input type="text" placeholder="Enter new production company" name="prod" onChange={handleChange} />
          )}
          <br />
        </div>
        <label>Poster Image Address:</label>
        <input type="text" name="img" value={formData.img} onChange={handleChange} />
        <br />
        <button type="submit">Submit</button>
      </form>
    </div>
 )
}

export default NewMovie
