
const { BaseModel } = require('../database/BaseModel');
const { Types } = require('../database/DatabaseTypes');


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
    
    static nativeQueryGetAvgByRecipeId(id) {
        let sql = `SELECT AVG(vote) AS avgvote
        FROM ${this.tableName}
        WHERE recipe_id = ${id};
        `;

        return Vote.nativeQuery(sql);
    }

}

module.exports.Vote = Vote