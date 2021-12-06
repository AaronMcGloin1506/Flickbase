import {
    GET_ARTICLES,
    ERROR_GLOBAL,
    SUCCESS_GLOBAL,
    CLEAR_NOTIFICATION,
    AUTH_USER,
    SIGN_OUT,
    SITE_LAYOUT,
    GET_ARTICLE,
    CLEAR_CURRENT_ARTICLE,
    ADD_ARTICLE,
    GET_ADMIN_ARTICLES,
    UPDATE_ARTICLE_STATUS
} from '../types'

//////////////// Articles ////////////////
export const addArticle = (article) => ({
    type: ADD_ARTICLE,
    payload: article
}) 

export const getArticles = (articles) => ({
    type: GET_ARTICLES,
    payload: articles
})

export const getArticle = (article) => ({
    type: GET_ARTICLE,
    payload: article
})

export const getPaginateArticles = (articles) => ({
    type: GET_ADMIN_ARTICLES,
    payload: articles
})

export const clearCurrentArticle = () => ({
    type: CLEAR_CURRENT_ARTICLE
})

export const updateArticleStatus = (articles) => ({
    type: UPDATE_ARTICLE_STATUS,
    payload: articles
})

///////////// Notifications //////////////
export const errorGlobal = (msg) => ({
    type: ERROR_GLOBAL,
    payload: msg
})

export const successGlobal = (msg) => ({
    type: SUCCESS_GLOBAL,
    payload: msg
})

export const clearNotifications = () => {
    return (dispatch) => {
        dispatch({
            type: CLEAR_NOTIFICATION         
        })
    }
}

///////////// Auth //////////////
export const authUser = (user) => ({
    type: AUTH_USER,
    payload: user
}) 

export const signOut = () => ({
    type: SIGN_OUT
})

///////////// site //////////////
export const appLayout = (layout) => ({
    type: SITE_LAYOUT,
    payload: layout
})

 