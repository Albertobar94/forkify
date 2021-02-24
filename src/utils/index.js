export const formatRecipeIngredients = (element, index) => {
  return element[index].replaceAll(' ', '').split(',')
}
export const isNotCorrectlyFormatted = (ingredientArray) => {
  return ingredientArray.length !== 3;
}
export const createRecipeObject = (resp) => {
  const { recipe } = resp.data;
  return {
    id: recipe.id,
    title: recipe.title,
    publisher: recipe.publisher,
    sourceUrl: recipe.source_url,
    image: recipe.image_url,
    servings: recipe.servings,
    cookingTime: recipe.cooking_time,
    ingredients: recipe.ingredients,
    ...(recipe.key && {key: recipe.key})
  }
}