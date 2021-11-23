const AccessControl = require('accesscontrol');

let grantsObject = {
    // need to be the exact name of roles
    admin: {
        profile: {
            'create:any': ['*'],
            'read:any': ['*'],
            'update:any': ['*'],
            'delete:any': ['*']
        },
        articles: {
            'read:any': ['*']
        },
        article:{
            'create:any': ['*'],
            'read:any': ['*'],
            'update:any': ['*'],
            'delete:any': ['*']
        }
    },
    user: {
        profile: {
            'read:own': ['*','!password','!_id','!date'],
            'update:own': ['*'],
        }
    }
}

const roles = new AccessControl(grantsObject);

module.exports = { roles }