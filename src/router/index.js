import { lazy, Suspense } from 'react'
import { Skeleton } from 'antd'
const Header = lazy(() => import("../layout/Header"))
// import Header from '../layout/Header'
// import Home from '../pages/home'
// 配置懒加载
const Home = lazy(() => import("../pages/home"))
const Login = lazy(() => import("../pages/login"))
const Detail = lazy(() => import("../pages/detail"))
const User = lazy(() => import("../pages/user"))

// 解决懒加载白屏时间
const lazyLoad = (children) => {
    return <Suspense fallback={<Skeleton active />}>
        {children}
    </Suspense>
}

// 路由配置 
const routes = [
    {
        path: "/",
        element: lazyLoad( <Header /> ),
        children: [
            {
                path: "/",
                element: lazyLoad(<Home />)
            },
            {
                path: "/detail/:id",
                element: lazyLoad(<Detail />)
            }
        ]
    },
    {
        path: "user",
        element: lazyLoad(<User />)
    },
    {
        path: "login",
        element: lazyLoad(<Login />)
    }

]

// 导出
export default routes