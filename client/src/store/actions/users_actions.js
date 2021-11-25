import * as users from './index'
import axios from 'axios'

axios.defaults.headers.post['Content-Type'] = 'application/jsom'


export const registerUser = (values) => {
    return async(dispatch) => {
        try{
            const user = await axios.post(`/api/users/register`,{
                email: values.email,
                password: values.password
            });
            dispatch(users.authUser({data:user.data, auth:true}))
            dispatch(users.successGlobal('Welcome!! Check your email and validate your account'))
        } 
        catch(error){
            console.log(error.response.data.message)
            dispatch(users.errorGlobal('Opps error registering user'))
        }
    }
}

export const signinUser = (values) => {
    return async(dispatch)=> {
        try{
            const user = await axios.post(`/api/users/signin`,{
                email: values.email,
                password: values.password
            });
            dispatch(users.authUser({data:user.data, auth:true}))
            dispatch(users.successGlobal('Welcome back!!'))
        }
        catch(error){
            console.log(error.response.data.message)
            dispatch(users.errorGlobal('Opps error signing in user'))
        }
    }
}