
const { BaseModel } = require('../database/BaseModel');
const { Types } = require('../database/DatabaseTypes');

/**
 * Vote for a recipe
 */
class Vote extends BaseModel {

    static get columns () { 
        return {
            id: Types.int,
            recipe_id: Types.int,
            vote: Types.int,
            user_id: Types.string
        }
    }

    static get tableName() {
        return 'r_vote'
    }
    
    /**
     * Calculate average of votes per recipe_id
     * @param {*} id 
     */
    static nativeQueryGetAvgByRecipeId(id) {
        let sql = `SELECT AVG(vote) AS avgvote
        FROM ${this.tableName}
        WHERE recipe_id = ${id};
        `;

        return Vote.nativeQuery(sql);
    }

}

module.exports.Vote = Vote