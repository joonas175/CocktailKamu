
const { BaseModel } = require('../database/BaseModel');
const { Types } = require('../database/DatabaseTypes');

/**
 * Recipe to ingredient mapping entity
 */
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

    static nativeQueryGetByRecipeIdWithInnerJoin(id) {
        let sql = `SELECT ingredient.name, r_ingredient.amount, r_ingredient.amount_unit
        FROM r_ingredient
        INNER JOIN ingredient
        ON r_ingredient.ingredient_id = ingredient.id
        WHERE r_ingredient.recipe_id = ${id};
        `;

        return RecipeIngredient.nativeQuery(sql);
    }

}

module.exports.RecipeIngredient = RecipeIngredient