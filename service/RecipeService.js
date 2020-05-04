const { Recipe } = require('../entities/Recipe');
const { RecipeStepService } = require('./RecipeStepService');

class RecipeService {

    static async insertRecipe(props) {

        const recipe = new Recipe(props);

        if(!recipe.steps || recipe.steps.length < 1) {
            throw "Atleast 1 step is needed"
        }

        /*
        if(!recipe.ingredients || recipe.ingredients.length < 1) {
            throw "Atleast 1 ingredient is needed"
        }
        */

        const resp = await recipe.insert();

        resp.steps = await RecipeStepService.insertRecipeSteps(recipe.steps, resp.id);

        return resp;

    }

    static async getRecipes() {

        const resp = await Recipe.get();

        return resp;
    }

}

module.exports.RecipeService = RecipeService;