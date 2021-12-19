import { Menu } from 'antd'
import { useState } from 'react'
import { articleSearch } from '../../services/home'
import { SearchWrapper } from './style'
import { SearchOutlined } from '@ant-design/icons'

const Search = () => {
  const [data, setData] = useState([])
  const [value, setValue] = useState('')
  const [isShow, setIsShow] = useState(false)
  const [timer, setTimer] = useState(0)

  const onChange = ({ target: { value } }) => {
    // 受控组件
    setValue(value)
    // 手动防抖
    clearTimeout(timer)
    setTimer(
      setTimeout(async () => {
        const {
          data: { article_list },
        } = await articleSearch({
          search: value,
          n: 7,
          skip: 0,
        })
        setData(article_list)
      }, 500),
    )
  }

  // 关键词高亮
  const hightlight = (str, keyword) => {
    const parts = str.split(new RegExp(`(${keyword})`, 'gi'))
    return (
      <span>
        {parts.map((part, index) => (
          <span key={index} className={part === keyword ? 'keyword' : ''}>
            {part}
          </span>
        ))}
      </span>
    )
  }

  return (
    <SearchWrapper
      style={{ borderRadius: isShow && data?.length ? '10px 10px 0 0' : '' }}
    >
      <input
        type="text"
        className="input"
        autoFocus
        value={value}
        onChange={onChange}
        onFocus={() => setIsShow(true)}
        onBlur={(e) => {
          setIsShow(false)
          e.relatedTarget?.click()
        }}
      />
      <a
        className="button"
        target="_blank"
        rel="noreferrer"
        href={`https://so.toutiao.com/search?dvpf=pc&source=input&keyword=${value}`}
        onClick={(e) => (value === '' ? e.preventDefault() : '')}
      >
        <SearchOutlined className="icon" />
      </a>
      {
        <Menu className="results" style={{ display: isShow ? '' : 'none' }}>
          {data?.map((item, index) => (
            <Menu.Item key={index} className="result">
              <a
                target="_blank"
                rel="noreferrer"
                href={`https://so.toutiao.com/search?dvpf=pc&source=input&keyword=${item.title}`}
                onMouseDown={() => {}}
              >
                {hightlight(item.title, value)}
              </a>
            </Menu.Item>
          ))}
        </Menu>
      }
    </SearchWrapper>
  )
}

export default Search
