import { API_URL, RES_PER_PAGE } from "./config";
import { getJSON } from "./views/helpers";

export const state = {
  // * current recipe in the recipeView
  recipe: {},
  // * Search state results for the resultsView
  search: {
    query: '',
    results: [],
    resultsPerPage: RES_PER_PAGE,
    page: 1
  },
  bookmarks: []
}

export const loadRecipe = async(id) => {
  try {
    // * fetching JSON data
    const data = await getJSON(`${API_URL}/${id}`);
    // * Dispatching the data to store
    const { recipe } = data.data;
    // *
    state.recipe = {
      id: recipe.id,
      title: recipe.title,
      publisher: recipe.publisher,
      sourceUrl: recipe.source_url,
      image: recipe.image_url,
      servings: recipe.servings,
      cookingTime: recipe.cooking_time,
      ingredients: recipe.ingredients
    }
    // * iterating on the bookmarks array and updating the data
    if(state.bookmarks.some( bookmark => bookmark.id === id)) {
      state.recipe.bookmarked = true;
    } else {
      state.recipe.bookmarked = false;
    }
  } catch (error) {
    throw error;
  }

}

export const loadSearchResults = async (query) => {
  try {
    // * grabbing the hash from the url
    state.search.query = query;
    // * fetching the data
    const data = await getJSON(`${API_URL}?search=${query}`);
    // * updating the state with the new fetched data
    state.search.results = data.data.recipes.map( rec => ({
      id: rec.id,
      title: rec.title,
      publisher: rec.publisher,
      sourceUrl: rec.source_url,
      image: rec.image_url,
    }))
    // * resetting the page state
    state.search.page = 1;
  } catch (error) {
    throw error;
  }
};

// * we receive interger for current pager
export const getSearchResultsPage = (page = state.search.page) => {
  // * updating the current page to the argument received
  state.search.page = page;
  // * getting an index for the slice method for both start and end values
  const start = (page - 1) * state.search.resultsPerPage;
  const end = page * state.search.resultsPerPage;
  return state.search.results.slice(start, end);
};

// * we receive interger for servings quantity, it increments in steps of 1
export const updateServings = (newServings) => {

  state.recipe.ingredients.forEach( ing => {
    // * generating the new quantity for each ingredient with this formula
    ing.quantity = ing.quantity * newServings / state.recipe.servings;
  });
  // * updating the value of the servings
  state.recipe.servings = newServings;
};

const persistBookmarks = () => {
  localStorage.setItem('bookmarks', JSON.stringify(state.bookmarks))
}

const loadBookmarks = () => {
  const storage = localStorage.getItem('bookmarks');
  if(storage) {
    state.bookmarks = JSON.parse(storage)
  }
}

// * we receive the current recipe from state
export const addBookmark = (recipe) => {
  // * Add bookmark
  state.bookmarks.push(recipe)
  // * Mark current recipe as bookmark
  if(recipe.id === state.recipe.id) {
    state.recipe.bookmarked = true;
  }
  persistBookmarks()
};

// ? receiving a hash id
export const deleteBookmark = (id) => {
  // * finding the index of the bookmark in the array
  const index = state.bookmarks.findIndex( el => el.id === id)
  // * mutating the array
  state.bookmarks.splice(index, 1);
  // *
  if(id === state.recipe.id) {
    state.recipe.bookmarked = false;
  }
  persistBookmarks()
}

// * loading bookmarks from localstorage
loadBookmarks()

const clearBookmarks = () => {
  localStorage.clear('bookmarks')
}