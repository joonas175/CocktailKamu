const { Vote } = require('../entities/Vote');
const { BaseService } = require('./BaseService');

/**
 * Service to handle voting on Recipes
 */
class VoteService extends BaseService {

    static get staticType () {
        return Vote;
    }

    /**
     * Inserts or replaces a vote in database. Needs userId, check
     * in controller that user is logged in.
     * @param {*} id 
     * @param {*} voteVal 
     * @param {*} userId 
     */
    static async insertVote(id, voteVal, userId) {
        // Search terms for possible old vote
        const terms = {
            recipe_id: id,
            user_id: userId
        }

        let previous = await this.searchByTerms(terms);
        // If previous is present, update it and return
        if(previous && previous[0]){
            previous = new Vote(previous[0]);
            previous.vote = voteVal;
            const resp = previous.update();

            return resp;
        }

        // Create new vote entity if no old vote is present
        const vote = new Vote({
            recipe_id: id,
            user_id: userId,
            vote: voteVal
        })

        const resp = await vote.insert()

        return resp;

    }

    /**
     * Use native query to get avg of votes on a single recipe
     * @param {*} id recipe id
     */
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