import instance from "../utils/request";
import qs from "qs"

// 根据id获取文章详情
export const getArticleDetail = (options) => {
    console.log(options);
    return instance({
        url: "/article_content_test",
        method: "GET",
        params: options
    })
}

// 获取作者的文章列表
export const getArticleList = (options) => {
    return instance({
        url: "/article_list_user",
        method: "GET",
        params: options
    })
}

// 根据标签获取文章

export const getArticleByTag = (options) => {
    return instance({
        url: "/article_list",
        method: "GET",
        params: options
    })
}