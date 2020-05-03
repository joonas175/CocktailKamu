const { Ingredient } = require('../entities/Ingredient');

class IngredientService {

    static async insertIngredient(props) {

        const ingredient = new Ingredient(props);

        const resp = await ingredient.insert();

        return resp;

    }

    static async getAllIngredients() {

        const resp = await Ingredient.get();

        return resp;

    }

    static async getIngredientsById(idArray) {

        const params = {
            where: idArray.map((id) => `(id = ${id})`).join(' OR ')
        };
        
        const resp = await Ingredient.get(params);

        return resp;
    }

}

module.exports.IngredientService = IngredientService;