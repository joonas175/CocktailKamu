const { VoteService } = require('../service/VoteService');

const controllers = [
    {
        method: 'put',
        path: '/vote/:id(\\d+)',
        func: async (req, res) => {

            try {
                let vote = await VoteService.insertVote(req.params.id, req.query.vote, req.userId);

                res.send(vote);

            } catch (error) {
                console.log(error);
                res.status(500).send({
                    status: 500,
                    message: "Internal server error"
                })
            }

        },
        requiresSignIn: true
    },
    {
        method: 'get',
        path: '/vote/:id(\\d+)',
        func: async (req, res) => {

            console.log(req.userId);

            try {
                let avg = await VoteService.getAvgById(req.params.id);

                res.send(avg);
                
            } catch(error) {
                console.log(error);
                res.status(500).send({
                    status: 500,
                    message: "Internal server error"
                })
            }
        }
    }
]

module.exports.default = controllers;