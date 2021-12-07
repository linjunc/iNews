import instance from '../utils/request'

export const getData = (options) => {
    return instance({
        url: "/test",
        method: "GET",
        params: options
    })
}

export const userLogin =(options) => {
    return instance({
        url: "/user_login",
        method: "POST",
        data: options,
    })
}
