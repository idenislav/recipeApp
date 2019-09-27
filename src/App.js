import React, { useEffect, useState } from 'react';
import './App.css';
import Recipe from './Recipe';

  const App = () => {
  const APP_ID = "f5b26b3e";
  const APP_KEY = "25931036ddb878cb9fe496e061820304";
 
  const [recipies, setRecipies] = useState([]);
  const [search, setSearch] = useState('');
  const [query, setQuery] = useState('chicken')

  useEffect(() => {
    getRecipies();
  },[query]);

  const getRecipies = async() => {
    const response = await fetch(`https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`)
    const data = await response.json();
    setRecipies(data.hits);
    console.log(data.hits);
  } 

  const updateSearch = e => {
    setSearch(e.target.value);
    
  }

  const getSearch = e => {
    e.preventDefault();
    setQuery(search);
    setSearch('');
  }
  
  return(
    <div className="App">
        <form onSubmit={getSearch} className="search-form">
          <input className="search-bar" type="text" value={search} onChange={updateSearch} />
          <button className="search-button" type="submit">
            Search
          </button>
        </form>
        <div className="recipies">
        {recipies.map(recipe => (
          <Recipe 
          key={recipe.recipe.label}
          title={recipe.recipe.label} calories={recipe.recipe.calories} 
          image={recipe.recipe.image}
          ingredients={recipe.recipe.ingredients} />
        ))}
        </div>
     </div> 
  ) 
}

export default App;
