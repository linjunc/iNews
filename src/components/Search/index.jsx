import { Menu, Modal } from 'antd'
import { useCallback, useContext, useEffect, useRef, useState } from 'react'
import { articleSearch } from '../../services/home'
import {getSearchData} from '../../services/search'
import { SearchWrapper } from './style'
import { SearchOutlined } from '@ant-design/icons'
import { headerShowContext } from '../../models/context'
import {ResultModal} from './Result'

const Search = ({ placeholder, style, setFocus }) => {
  const [data, setData] = useState([])
  const [value, setValue] = useState('')
  const [isShow, setIsShow] = useState(false)
  const [timer, setTimer] = useState(0)
  const [headerShow] = useContext(headerShowContext)
  const inputRef = useRef()
  const buttonRef = useRef()

  // 当头部可见改变，失焦
  useEffect(() => {
    inputRef.current?.blur()
  }, [headerShow])

  const onChange = ({ target: { value } }) => {
    setValue(value)
  }

  const onEnter = useCallback(async () => {
    // 受控组件
    // setValue(value)
    // 手动防抖
    const {
      data,
    } = await getSearchData({
      keyword: value,
    })
    
    setData(data.data)
    setIsShow(true)
  }, [value])

  const onClose = () => {
    setIsShow(false)
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
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            onEnter(e)
          }
        }}
        onChange={onChange}
        onFocus={() => {
          setFocus?.(true)
        }}
        onBlur={(e) => {
          setFocus?.(false)
          e.relatedTarget?.click()
        }}
      />
      <div
        ref={buttonRef}
        className="button"
        target="_blank"
        rel="noreferrer"
        onClick={(e) => {
          if(!value) {
            return;
          }
          onEnter(e)
        }}
      >
        <SearchOutlined className="icon" />
      </div>
     {isShow ? <ResultModal data={data} onClose={onClose} /> : null}
      {
        // <Menu className="results" style={{ display: isShow ? '' : 'none' }}>
        //   {data?.map((item, index) => (
        //     <Menu.Item key={index} className="result">
        //       <a
        //         target="_blank"
        //         rel="noreferrer"
        //         href={`https://so.toutiao.com/search?dvpf=pc&source=input&keyword=${item.title}`}
        //       >
        //         {hightlight(item.title, value)}
        //       </a>
        //     </Menu.Item>
        //   ))}
        // </Menu>
      }
    </SearchWrapper>
  )
}

export default Search
