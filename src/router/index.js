import { lazy, Suspense } from 'react'
import { Skeleton } from 'antd'
const Header = lazy(() => import('../layout/Header'))
// import Header from '../layout/Header'
// import Home from '../pages/home'
// 配置懒加载
const Home = lazy(() => import('../pages/home'))
const Login = lazy(() => import('../pages/login'))
const Detail = lazy(() => import('../pages/detail'))
const User = lazy(() => import('../pages/user'))
const CovidMap = lazy(() => import('../pages/covidMap'))
// 为个人中心中的组件配置懒加载
const Posts = lazy(() => import('../pages/user/c-cpns/posts'))
const Collect = lazy(() => import('../pages/user/c-cpns/collect'))
const Likes = lazy(() => import('../pages/user/c-cpns/likes'))
const Concern = lazy(() => import('../pages/user/c-cpns/concern'))
const ReadingReport = lazy(() => import('../pages/user/c-cpns/reading-report'))

// 解决懒加载白屏时间
const lazyLoad = (children) => {
  return <Suspense fallback={<Skeleton active />}>{children}</Suspense>
}

// 路由配置
const routes = [
  {
    path: '/',
    element: lazyLoad(<Header />),
    children: [
      {
        path: '/',
        element: lazyLoad(<Home />),
      },
      {
        path: '/detail/:id',
        element: lazyLoad(<Detail />),
      },
      {
        path: '/user/:id',
        element: lazyLoad(<User />),
        children: [
          {
            path: '',
            element: lazyLoad(<Posts />),
          },
          {
            path: 'posts',
            element: lazyLoad(<Posts />),
          },
          {
            path: 'collect',
            element: lazyLoad(<Collect />),
          },
          {
            path: 'likes',
            element: lazyLoad(<Likes />),
          },
          {
            path: 'tags',
            element: lazyLoad(<Concern />),
          },
          {
            path: 'report',
            element: lazyLoad(<ReadingReport />),
          },
        ],
      },
      {
        path: 'covidMap',
        element: lazyLoad(<CovidMap />),
      },
    ],
  },
  {
    path: 'login',
    element: lazyLoad(<Login />),
  },
]

// 导出
export default routes
