const { functions } = require('lodash')
const { nextTick } = require('process')
const { roles } = require('../config/roles')

exports.grantAccess = function(action, resource){
    //its a function that returns a function ---> HOC
    return async(req, res, next) => {
        try {
            const permission = roles.can(req.user.role)[action](resource);
            if(!permission.granted){
                return res.status(400).json({
                    error: 'You dont have permission'
                })
            }
            res.locals.permission = permission;
            next();
        }catch(error){
            next(error)
        }
    }
}