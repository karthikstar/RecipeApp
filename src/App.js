import React,{useEffect,useState} from 'react';

import Recipe from './recipe'
import './App.css';


const App = () => {
  
  const APP_ID = "7ef77d94";
  const APP_KEY = "83d14a7b61744442cff14b5cb42e3d61"
  // normal we shld use env tools to protect these, as if we push these live, ppl can see our app key and id.
  
  const [recipes , setRecipes] = useState([])
  const [search,setSearch] = useState('')
  const [query, setQuery] = useState('chicken')
// whatever we pass into useState() is the default value for query.
  useEffect( () => {
    getRecipes();
  }, [query]) // this is only gg to run when we click the submit button which is the only time the current state chicken is going to change.

// passing a function as parameter 
// this function runs immediately when the page is rendered for the first time, and after every time smth re-renders, it also runs.
// basically runs whenever the page re renders. 
// to make useEffect fn run once, adding a 2nd argument [] ensures that this function only runs when page is rendered for the first time
// adding values to 2nd argument [] like counter
// if we pass in [counter] as a 2nd arg instead, useffect runs whenever counter changes.

const getRecipes = async() => {
  const response = await fetch(`https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`)
  const data = await response.json()
  setRecipes(data.hits)
  // console.log(data.hits)

} // make sure to write await whenever we have a promise. 

// above statement could also have been written in this format
// fetch(site)
// .then(response => {
// response.json() })
  const updateSearch = e => {
    setSearch (e.target.value)
    // console.log(search)
  }
  const getSearch = e => {
    e.preventDefault(); // to prevent page refresh
    setQuery(search)
    setSearch('')

  }

  return (
  <div className = "App">
    <h1 className = "title">Search any food you want to cook!</h1>
    <form onSubmit = {getSearch} className = "search-form">
      <input className = "search-bar" type = "text" value = {search} onChange = {updateSearch} />
      <button className= "search-button" type = "submit" >Search</button> 

    </form>
    <div className = "recipes">
      {recipes.map(recipe => 
        (
          <Recipe key = {recipe.recipe.label} title = {recipe.recipe.label} calories = {recipe.recipe.calories} image = {recipe.recipe.image} ingredients = {recipe.recipe.ingredients}/>
        ))}
    </div>

  </div>

  )
}





export default App;
