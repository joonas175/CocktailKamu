const { RecipeIngredient } = require('../entities/RecipeIngredient');

class RecipeIngredientService {

    static async insertRecipeIngredients(ingredients, recipeId) {

        let resp = [];

        for(let ingredient of ingredients) {
            ingredient.recipe_id = recipeId;
            ingredient = new RecipeIngredient(ingredient);
            resp.push(await ingredient.insert());
        }

        return resp;
       
    }

    static async getRecipeStepsById() {

       
    }

}

module.exports.RecipeIngredientService = RecipeIngredientService;