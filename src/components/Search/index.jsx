import { Menu } from 'antd'
import { useContext, useEffect, useRef, useState } from 'react'
import { articleSearch } from '../../services/home'
import { SearchWrapper } from './style'
import { SearchOutlined } from '@ant-design/icons'
import { headerShowContext } from '../../models/context'

const Search = ({ placeholder, style, setFocus }) => {
  const [data, setData] = useState([])
  const [value, setValue] = useState('')
  const [isShow, setIsShow] = useState(false)
  const [timer, setTimer] = useState(0)
  const [headerShow] = useContext(headerShowContext)
  const inputRef = useRef()

  // 当头部可见改变，失焦
  useEffect(() => {
    inputRef.current?.blur()
  }, [headerShow])

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
      style={
        isShow && data?.length
          ? {
              borderRadius: '10px 10px 0 0',
              backgroundColor: '#fff',
            }
          : {}
      }
      {...style}
    >
      <span className="holder" style={{ display: value ? 'none' : 'block' }}>
        {placeholder}
      </span>
      <input
        ref={inputRef}
        type="text"
        className="input"
        autoFocus
        value={value}
        onChange={onChange}
        onFocus={() => {
          setIsShow(true)
          setFocus?.(true)
        }}
        onBlur={(e) => {
          setIsShow(false)
          setFocus?.(false)
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
