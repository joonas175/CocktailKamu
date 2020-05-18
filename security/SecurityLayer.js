const axios = require('axios').default
const { getOAuthClient } = require('./oauth2Client')

class SecurityLayer {

    static setSecurityLayer(controller) {
        return async (req, res, next) => {
            await this.checkPermissions(req, res, next, controller);
        }
    }

    static async checkPermissions(req, res, next, controller) {
        console.log(controller.allowed)

        if (controller.requiresSignIn === null || controller.requiresSignIn === undefined || controller.requiresSignIn === false) {
            next();
        } else {
            console.log("Needs sign in!")
            let authObj = await this.checkTokenValidity(req)
            if(authObj !== null) {
                req.userId = authObj.getPayload().sub;
                next();
            } else {
                res.status(401).send("Unauthorized");
            }
            
        }
    }

    static checkTokenValidity(req) {

        let authHeader = req.headers.authorization;

        if(authHeader === undefined || authHeader === null){
            return null;
        }   
        
        const token = authHeader.split(' ')[1];
        
        return getOAuthClient().verifyIdToken({idToken: token}).then((value) => {
            return value;
        }).catch((error) => {
            console.log(error)
            return null;
        })
    
    }
}


module.exports.SecurityLayer = SecurityLayer;