const { Ingredient } = require('../entities/Ingredient');

class IngredientService {

    static async insertIngredient(props) {

        const ingredient = new Ingredient(props);

        const resp = await ingredient.insert();

        return resp;

    }

    static getAllIngredients() {

        const resp = await Ingredient.get();

        return resp;

    }

}

module.exports.IngredientService = IngredientService;