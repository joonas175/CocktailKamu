const { RecipeStep } = require('../entities/RecipeStep');

class RecipeStepService {

    static async insertRecipeSteps(steps, recipeId) {

        let resp = [];

        for(let step of steps) {
            step.recipe_id = recipeId;
            step = new RecipeStep(step);
            resp.push(await step.insert());
        }

        return resp;
       
    }

    static async getRecipeStepsById() {

       
    }

}

module.exports.RecipeStepService = RecipeStepService;