import 'core-js/stable';
import 'regenerator-runtime/runtime'
import * as model from './model';
import recipeView from './views/recipeView'
import searchView from './views/searchView';
import resultsView from './views/resultsView';
import paginationView from './views/paginationView';

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
    // * update results view to mark selected search result
    resultsView.update(model.getSearchResultsPage())
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
    if (!query ) return;

    // * load search results
    await model.loadSearchResults(query)

    // * render results
    resultsView.render(model.getSearchResultsPage())

    // * render the pagination buttons
    paginationView.render(model.state.search)

  } catch (error) {
    console.log(error);
    recipeView.renderError()
  }
};

const controlPagination = (goToPage) => {
  // * render results
  resultsView.render(model.getSearchResultsPage(goToPage))

  // * render the pagination buttons
  paginationView.render(model.state.search)
};

const controlServings = (newServings) => {
  // * Update the recipe servings (in state)
  model.updateServings(newServings)
  // * Update the recipe view
  // recipeView.render(model.state.recipe)
  recipeView.update(model.state.recipe)
}

const init = () => {
  recipeView.addHandlerRender(controlRecipes);
  recipeView.addHandlerUpdateServings(controlServings);
  searchView.addHandlerSearch(controlSearchResults);
  paginationView.addHandlerClick(controlPagination);
};

init();



