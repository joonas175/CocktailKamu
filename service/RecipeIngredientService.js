const { RecipeIngredient } = require('../entities/RecipeIngredient');

/**
 * Service for handling RecipeIngredient entities
 */
class RecipeIngredientService {

    /**
     * Insert multiple recipe ingredients to database. Needs recipe id!
     * @param {*} ingredients 
     * @param {*} recipeId 
     */
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

    /**
     * Fetch recipe ingredients by recipe id, joining them with ingredients for full details
     * @param {*} id 
     */
    static async getIngredientsByReceiptID(id) {

        const resp = await RecipeIngredient.nativeQueryGetByRecipeIdWithInnerJoin(id);

        return resp;
    }

}

module.exports.RecipeIngredientService = RecipeIngredientService;