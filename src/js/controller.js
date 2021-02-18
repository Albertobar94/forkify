import 'core-js/stable';
import 'regenerator-runtime/runtime'
import * as model from './model';
import recipeView from './views/recipeView'
import searchView from './views/searchView';
import resultsView from './views/resultsView';

if(module.hot) {
  module.hot.accept();
}



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
    recipeView.renderError()
  }
};
const controlSearchResults = async () => {
  try {
    resultsView.renderSpinner();
    // * get search query
    const query = searchView.getQuery();
    console.log(query, 'quey');
    if (!query ) return;

    // * load search results
    await model.loadSearchResults(query)
    console.log(model, 'model');
    // * render results
    resultsView.render(model.state.search.results)

  } catch (error) {
    console.log(error);
    recipeView.renderError()
  }
}

const init = () => {
  recipeView.addHandlerRender(controlRecipes);
  searchView.addHandlerSearch(controlSearchResults)
};

init();



