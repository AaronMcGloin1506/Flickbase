import {
    GET_ARTICLES,
    ERROR_GLOBAL,
    SUCCESS_GLOBAL
} from '../types'

//////////////// Articles ////////////////
export const getArticles = (articles) => ({
    type: GET_ARTICLES,
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