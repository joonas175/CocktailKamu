const { Recipe } = require('../entities/Recipe');

class RecipeService {

    static async insertRecipe(props) {

        const recipe = new Recipe(props);

        const resp = await recipe.insert();

        return resp;

    }

    static async getRecipes() {

        const resp = await Recipe.get();

        return resp;
    }

}

module.exports.RecipeService = RecipeService;