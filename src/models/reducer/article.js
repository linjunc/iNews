import {
    ADD_ARTICLE,
    DELETE_ARTICLE,
    INIT_ARTICLE
} from "../constant"

// state [{},{},{}]
export const Article = (state, action) => {
    switch (action.type) {
        case INIT_ARTICLE:
            return [...action.articleData]
        case ADD_ARTICLE:
            const addIndex = state.findIndex(item => item.item_id === action.article.item_id) // 看看有没有这个id
            const res = addIndex === -1 ? [action.article, ...state] : state
            localStorage.setItem('articleLater', JSON.stringify(res))
            return res
        case DELETE_ARTICLE:
            const deleteIndex = state.findIndex(item => item.item_id === action.id)
            deleteIndex !== -1 && state.splice(deleteIndex, 1)
            localStorage.setItem('articleLater', JSON.stringify([...state]))
            return [...state]
        default:
            return state
    }
}