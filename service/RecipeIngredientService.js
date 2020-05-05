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

    static async getIngredientsByIDs(idArray) {

        const params = {
            where: idArray.map((id) => `(id = ${id})`).join(' OR ')
        };
        
        const resp = await RecipeIngredient.get(params);

        return resp;
    }

    static async getIngredientsByReceiptID(id) {

        const params = {
            where: `recipe_id = ${id}`
        };
        
        const resp = await RecipeIngredient.get(params);

        return resp;
    }

}

module.exports.RecipeIngredientService = RecipeIngredientService;