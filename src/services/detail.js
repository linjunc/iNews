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