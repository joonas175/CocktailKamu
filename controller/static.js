
const controllers = [
    {
        method: 'get',
        path: '/',
        func: (req, res) => {
            res.status(501).send({
                status: 501,
                message: "Not yet implemented!"
            })
        }
    }
]

module.exports.default = controllers;