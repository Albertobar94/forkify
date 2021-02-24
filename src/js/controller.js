import 'core-js/stable';
import 'regenerator-runtime/runtime'
import * as model from './model';
import recipeView from './views/recipeView'
import searchView from './views/searchView';
import resultsView from './views/resultsView';
import paginationView from './views/paginationView';
import bookmarksView from './views/bookmarksView';
import addRecipeView from './views/addRecipeView';


// * parcel feature
if(module.hot) {
  module.hot.accept();
}

const controlRecipes = async () => {
  try {
    // * obtaining hash from url
    const id = window.location.hash.slice(1);
    // * null guardian
    if ( !id ) return;
    // * Ui spinner
    recipeView.renderSpinner();
    // * update results view to mark selected search result
    resultsView.update(model.getSearchResultsPage())
    bookmarksView.update(model.state.bookmarks)
    // * 1. Fetching Data
    await model.loadRecipe(id)
    // * 2. Rendering recipe
    recipeView.render(model.state.recipe)
  } catch (err){
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
    recipeView.renderError()
  }
};

// * receiving an integer as the goToPage
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
  recipeView.update(model.state.recipe)
};

const controlAddBookmark = () => {
  // * toogle bookmark
  if(!model.state.recipe.bookmarked) {
    model.addBookmark(model.state.recipe)
  } else {
    model.deleteBookmark(model.state.recipe.id)
  }
  // * update button in recipeView
  recipeView.update(model.state.recipe)
  // * render bookmarks
  bookmarksView.render(model.state.bookmarks)
}

const controlBookmarks = () => {
  bookmarksView.render(model.state.bookmarks)
}

const controlAddRecipe = async(newRecipe) => {
  try {
    addRecipeView.renderSpinner();
    await model.uploadRecipe(newRecipe)
    recipeView.render(model.state.recipe);
    // * Close modal
    setTimeout(() => {
      addRecipeView.toggleWindow();
    }, 2500);
    addRecipeView.renderMessage();
    bookmarksView.render(model.state.bookmarks);
    // *Change Id url
    window.history.pushState(null, '', `#${model.state.recipe.id}`)
  } catch (error) {
    addRecipeView.renderError(error.message)
  }
}

const init = () => {
  recipeView.addHandlerRender(controlRecipes);
  recipeView.addHandlerUpdateServings(controlServings);
  searchView.addHandlerSearch(controlSearchResults);
  paginationView.addHandlerClick(controlPagination);
  recipeView.addHandlerAddBookmark(controlAddBookmark);
  bookmarksView.addHandlerRender(controlBookmarks);
  addRecipeView.addHandlerUpload(controlAddRecipe);
};

init();



