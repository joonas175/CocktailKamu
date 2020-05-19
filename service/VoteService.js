const { Vote } = require('../entities/Vote');
const { BaseService } = require('./BaseService');

class VoteService extends BaseService {

    static get staticType () {
        return Vote;
    }

    static async insertVote(id, voteVal, userId) {

        const terms = {
            recipe_id: id,
            user_id: userId
        }

        const previous = await this.searchByTerms(terms);

        console.log(previous);

        const vote = new Vote({
            recipe_id: id,
            user_id: userId,
            vote: voteVal
        })

        const resp = await vote.insert()

        return resp;

    }

    static async getAvgById(id) {

        const resp = await Vote.nativeQueryGetAvgByRecipeId(id);

        if (resp.length > 0) {
            return resp[0];
        } else {
            return { avgvote: 0 }
        }

        

    }

}

module.exports.VoteService = VoteService;