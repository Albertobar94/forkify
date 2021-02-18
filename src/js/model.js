import { API_URL } from "./config";
import { getJSON } from "./views/helpers";

export const state = {
  recipe: {},
  search: {
    query: '',
    results: [],
  }
}

export const loadRecipe = async(id) => {
  try {
    // * fetching JSON data
    const data = await getJSON(`${API_URL}/${id}`);
    // * Dispatching the data to store
    const {recipe} = data.data;
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
  } catch (error) {
    throw error;
  }

}

export const loadSearchResults = async (query) => {
  try {
    state.search.query = query;
    const data = await getJSON(`${API_URL}?search=${query}`)
    state.search.results = data.data.recipes.map( rec => ({
      id: rec.id,
      title: rec.title,
      publisher: rec.publisher,
      sourceUrl: rec.source_url,
      image: rec.image_url,
    }))
  } catch (error) {
    throw error;
  }
}