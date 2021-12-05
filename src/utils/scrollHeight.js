// 获取到顶部的距离
export const getScrollTop = () => {
    let scrollTop = 0;
    if (document?.documentElement && document?.documentElement?.scrollTop) {
        scrollTop = document?.documentElement.scrollTop;
    }
    else if (document?.body) {
        scrollTop = document?.body.scrollTop;
    }
    return scrollTop;
}
