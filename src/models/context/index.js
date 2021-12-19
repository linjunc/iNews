import { createContext } from 'react'

export const articleContext = createContext([])
export const userContext = createContext({})
export const headerShowContext = createContext()
// 这个context包括了日历热图、是否关注等信息
export const allUserInfoContext = createContext({})
// 这个context只有用户信息
export const userInfoContext = createContext({})
