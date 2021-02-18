import { API_URL } from "./config";
import { getJSON } from "./views/helpers";

export const state = {
  recipe: {},
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
    console.error('model error', error);
  }

}