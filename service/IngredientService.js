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

    static async getIngredientsByIDs(idArray) {

        const params = {
            where: idArray.map((id) => `(id = ${id})`).join(' OR ')
        };
        
        const resp = await Ingredient.get(params);

        return resp;
    }

    static async searchIngredients(terms) {

        const params = {
            where: Object.keys(terms).filter((key) => (key != 'page' && key != 'limit')).map((key) => `(${key} LIKE '%${terms[key]}%')`).join(' AND ')
        };

        params.page = terms.page ? terms.page : 1;
        params.limit = terms.limit ? terms.limit : 10;
        
        const resp = await Ingredient.get(params);

        return resp;
    }

}

module.exports.IngredientService = IngredientService;