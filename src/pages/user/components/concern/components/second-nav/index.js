import React from 'react'
import { NavLink } from 'react-router-dom'

import { SecondNavWrapper } from './style'

export default function SecondNav() {
  const listData = [
    {
      title: '关注的用户',
      to: 'following',
    },
    {
      title: '关注者',
      to: 'followers',
    },
    {
      title: '关注的标签',
      to: 'tags',
    },
  ]

  return (
    <SecondNavWrapper>
      <h4 className="title">关注</h4>
      <div className="items">
        {listData.map((item) => {
          const { to, title } = item
          return (
            <NavLink key={title} className="item" to={to}>
              {title}
            </NavLink>
          )
        })}
      </div>
    </SecondNavWrapper>
  )
}
