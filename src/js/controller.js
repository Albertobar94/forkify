import 'core-js/stable';
import 'regenerator-runtime/runtime'
import * as model from './model';
import recipeView from './views/recipeView'

const { async } = require("q");

const recipeContainer = document.querySelector('.recipe');

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////

const controlRecipes = async () => {
  // * 1. Loading recipe
  try {
    // * obtaining hash from url
    const id = window.location.hash.slice(1);
    // * guardian
    if ( !id ) return;
    // * Ui spinner
    recipeView.renderSpinner();
    // * 1. Fetching Data
    await model.loadRecipe(id)
    // * 2. Rendering recipe
    recipeView.render(model.state.recipe)
  } catch (err){
    console.log('Err', err)
  }
}

['hashchange', 'load'].forEach( evn => window.addEventListener(evn, controlRecipes))

