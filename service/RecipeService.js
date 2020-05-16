const { Recipe } = require('../entities/Recipe');
const { RecipeStepService } = require('./RecipeStepService');
const { RecipeIngredientService } = require('./RecipeIngredientService');
const { BaseService } = require('./BaseService');

class RecipeService extends BaseService {

    static get staticType () {
        return Recipe;
    }

    static async insertRecipe(props) {

        const recipe = new Recipe(props);

        if(!recipe.steps || recipe.steps.length < 1) {
            throw "Atleast 1 step is needed"
        }

        if(!recipe.ingredients || recipe.ingredients.length < 1) {
            throw "Atleast 1 ingredient is needed"
        }

        const resp = await recipe.insert();

        resp.steps = await RecipeStepService.insertRecipeSteps(recipe.steps, resp.id);
        resp.ingredients = await RecipeIngredientService.insertRecipeIngredients(recipe.ingredients, resp.id);

        return resp;

    }

    static async getRecipes() {

        const resp = await Recipe.get();

        return resp;
    }

    static async getFullRecipeByID(id) {

        const resp = (await Recipe.get({where: `ID = ${id}`}))[0];

        resp.steps = await RecipeStepService.getStepsByReceiptID(id);

        resp.ingredients = await RecipeIngredientService.getIngredientsByReceiptID(id);

        return resp;

    }

    static async getRecipesByIngredientIDs(idArray) {

        const recipes = await Recipe.nativeQueryGetByRecipesByIngredientIDs(idArray);

        console.log(recipes);

        return recipes;
        
    }

}

module.exports.RecipeService = RecipeService;