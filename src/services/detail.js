import instance from "../utils/request";
import qs from "qs"

export const getArticleDetail = (options) => {
    console.log(options);
    return instance({
        url: "/article_content_test",
        method: "GET",
        params: options
    })
}

export const getArticleList = (options) => {
    return instance ({
        url: "/article_list",
        method: "GET",
        params: options
    })
}