const axios = require('axios').default;
const qs = require('querystring');
const { getOAuthClient } = require('../security/oauth2Client');

const controllers = [
    {
        method: 'get',
        path: '/token',
        func: async (req, res) => {

            try {
            
               const { tokens } = await getOAuthClient().getToken(req.query.code);
               console.log(tokens);
               res.send(tokens)
                
            } catch (error) {
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