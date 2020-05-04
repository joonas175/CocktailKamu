
const { BaseModel } = require('../database/BaseModel');
const { Types } = require('../database/DatabaseTypes');


class RecipeIngredient extends BaseModel {

    static get columns () { 
        return {
            id: Types.int,
            ingredient_id: Types.int,
            recipe_id: Types.int,
            amount: Types.float,
            amount_unit: Types.string
        }
    }
    

    static get tableName() {
        return 'r_ingredient'
    }

}

module.exports.RecipeIngredient = RecipeIngredient