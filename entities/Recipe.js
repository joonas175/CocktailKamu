
const { BaseModel } = require('../database/BaseModel');
const { Types } = require('../database/DatabaseTypes');


class Recipe extends BaseModel {

    static get columns () { 
        return {
            id: Types.int,
            name: Types.string,
            description: Types.string
        }
    }

    static get tableName() {
        return 'recipe'
    }

    static nativeQueryGetByRecipesByIngredientIDs(idArray) { // Longest function name ever :D
        let sql = `SELECT * 
        FROM recipe
        WHERE id IN (SELECT DISTINCT recipe_id FROM r_ingredient WHERE ingredient_id IN (${idArray.join(', ')}))
        ;`;

        console.log(sql);

        return Recipe.nativeQuery(sql);
    }

}

module.exports.Recipe = Recipe