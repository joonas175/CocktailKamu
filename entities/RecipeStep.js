
const { BaseModel } = require('../database/BaseModel');
const { Types } = require('../database/DatabaseTypes');

/**
 * Recipe to step mapping entity
 */
class RecipeStep extends BaseModel {

    static get columns () { 
        return {
            id: Types.int,
            recipe_id: Types.int,
            description: Types.string,
            step: Types.int
        }
    }

    static get tableName() {
        return 'r_step'
    }

}

module.exports.RecipeStep = RecipeStep