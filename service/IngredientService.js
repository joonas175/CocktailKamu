const { Ingredient } = require('../entities/Ingredient');
const { BaseService } = require('./BaseService');

/**
 * Service for handling Ingredient entities
 */
class IngredientService extends BaseService {

    static get staticType () {
        return Ingredient;
    }

    static async insertIngredient(props) {

        const ingredient = new Ingredient(props);

        const resp = await ingredient.insert();

        return resp;

    }

    static async getAllIngredients() {

        const resp = await Ingredient.get();

        return resp;

    }

    static async getIngredientsByIDs(idArray) {

        const params = {
            where: idArray.map((id) => `(id = ${id})`).join(' OR ')
        };
        
        const resp = await Ingredient.get(params);

        return resp;
    }

}

module.exports.IngredientService = IngredientService;