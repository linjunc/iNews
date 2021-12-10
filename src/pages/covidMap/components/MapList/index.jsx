import React, { useEffect, useRef, useState } from 'react'
import { Table } from 'antd'
import jsonp from 'jsonp'
import { MapListContainer } from './style'

const MapList = () => {
  const [listData, setListData] = useState([])

  useEffect(() => {
    // 获取数据
    // jsonp解决跨域
    jsonp(
      'https://interface.sina.cn/news/wap/fymap2020_data.d.json',
      {},
      (err, data) => {
        if (!err) {
          // 数据整理
          setListData(data.data.list)
          console.log(data.data.list)
        }
      },
    )
  }, [])

  const columns = [
    {
      title: '地区',
      dataIndex: 'name',
      className: 'nameColumn',
    },
    {
      title: '现有',
      dataIndex: 'econNum',
      className: 'econColumn',
      defaultSortOrder: 'descend',
      sorter: (a, b) => a.econNum - b.econNum,
    },
    {
      title: '累计',
      dataIndex: 'value',
      className: 'valueColumn',
      sorter: (a, b) => a.value - b.value,
    },
    {
      title: '治愈',
      dataIndex: 'cureNum',
      className: 'cureNumColumn',
      sorter: (a, b) => a.cureNum - b.cureNum,
    },
    {
      title: '死亡',
      dataIndex: 'deathNum',
      className: 'deathColumn',
      sorter: (a, b) => a.deathNum - b.deathNum,
    },
  ]
  return (
    <MapListContainer>
      <Table
        columns={columns}
        dataSource={listData}
        pagination={false}
        className="table-class"
        scroll={{
          y: '85vh',
          x: 100,
        }}
      />
    </MapListContainer>
  )
}

export default MapList
