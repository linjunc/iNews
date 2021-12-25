import { lazy, Suspense } from 'react'
import { Skeleton } from 'antd'
import { Navigate } from 'react-router'

// 由于个人主页文章列表那里共用了一个组件，所以需要传入不同的请求文章函数以及传入不同的请求关注列表函数
import {
  getLikeList,
  getCollectList,
  getHistoryList,
  getMediaNewsList,
  getFollowingList,
  getFollowersList,
} from '../services/user'

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
const PersonalPage = lazy(() =>
  import('../pages/user/components/personal-page'),
)
const Concern = lazy(() => import('../pages/user/components/concern'))
const ReadingReport = lazy(() =>
  import('../pages/user/components/reading-report'),
)
const UserSetting = lazy(() => import('../pages/user-setting'))
const UserProfile = lazy(() =>
  import('../pages/user-setting/components/user-profile'),
)
const UserAccount = lazy(() =>
  import('../pages/user-setting/components/user-account'),
)
const ConcernTags = lazy(() =>
  import('../pages/user/components/concern/components/tags'),
)
const ConcernFollow = lazy(() =>
  import('../pages/user/components/concern/components/follow'),
)
const NewsList = lazy(() => import('../pages/user/components/news-list'))

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
            element: lazyLoad(<PersonalPage />),
          },
          {
            path: 'person',
            element: lazyLoad(<NewsList getNewsFn={getHistoryList} />),
          },
          {
            path: 'collect',
            element: lazyLoad(<NewsList getNewsFn={getCollectList} />),
          },
          {
            path: 'likes',
            element: lazyLoad(<NewsList getNewsFn={getLikeList} />),
          },
          {
            path: 'released',
            element: lazyLoad(<NewsList getNewsFn={getMediaNewsList} />),
          },
          {
            path: 'concern',
            element: lazyLoad(<Concern />),
            children: [
              {
                path: '',
                element: <Navigate to="followers" />,
              },
              {
                path: 'tags',
                element: lazyLoad(<ConcernTags />),
              },
              {
                path: 'followers',
                element: lazyLoad(
                  <ConcernFollow
                    getFollowListFn={getFollowersList}
                    isFollower={true}
                  />,
                ),
              },
              {
                path: 'following',
                element: lazyLoad(
                  <ConcernFollow getFollowListFn={getFollowingList} />,
                ),
              },
            ],
          },
          {
            path: 'report',
            element: lazyLoad(<ReadingReport />),
          },
        ],
      },
      {
        path: '/user/setting',
        element: lazyLoad(<UserSetting />),
        children: [
          {
            path: '',
            element: <Navigate to="profile" />,
          },
          {
            path: 'profile',
            element: lazyLoad(<UserProfile />),
          },
          {
            path: 'account',
            element: lazyLoad(<UserAccount />),
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
