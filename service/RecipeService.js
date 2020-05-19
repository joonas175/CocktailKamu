const { Recipe } = require('../entities/Recipe');
const { RecipeStepService } = require('./RecipeStepService');
const { RecipeIngredientService } = require('./RecipeIngredientService');
const { BaseService } = require('./BaseService');

/**
 * Service for handling Recipe entities
 */
class RecipeService extends BaseService {

    static get staticType () {
        return Recipe;
    }

    /**
     * Insert a single recipe into database, with steps and ingredients.
     * Throws an error, if no steps or ingredients are present.
     * @param {*} props 
     */
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

    /**
     * Return all recipes
     */
    static async getRecipes() {

        const resp = await Recipe.get();

        return resp;
    }

    /**
     * Get full recipe, including steps and ingredients, by recipe id
     * @param {*} id 
     */
    static async getFullRecipeByID(id) {

        const resp = (await Recipe.get({where: `ID = ${id}`}))[0];

        resp.steps = await RecipeStepService.getStepsByReceiptID(id);

        resp.ingredients = await RecipeIngredientService.getIngredientsByReceiptID(id);

        return resp;

    }

    /**
     * Use native query to fetch all recipes, which include given ingredients
     * @param {*} idArray 
     */
    static async getRecipesByIngredientIDs(idArray) {

        const recipes = await Recipe.nativeQueryGetByRecipesByIngredientIDs(idArray);

        console.log(recipes);

        return recipes;
        
    }

}

module.exports.RecipeService = RecipeService;