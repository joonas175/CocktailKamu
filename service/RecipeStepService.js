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

    static async getStepsByIDs(idArray) {

        const params = {
            where: idArray.map((id) => `(id = ${id})`).join(' OR ')
        };
        
        const resp = await RecipeStep.get(params);

        return resp;
    }

    static async getStepsByReceiptID(id) {

        const params = {
            where: `recipe_id = ${id}`
        };
        
        const resp = await RecipeStep.get(params);

        return resp;
    }

}

module.exports.RecipeStepService = RecipeStepService;