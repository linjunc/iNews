import 'echarts/map/js/china.js'

import * as eCharts from 'echarts'
import jsonp from 'jsonp'
import React, { useEffect, useRef } from 'react'

import { MapContainer } from './style'

const Map = () => {
  const mapRef = useRef(null)
  const tempRef = useRef(null)
  // 初始显示中国地图
  useEffect(() => {
    // 获取数据
    // jsonp解决跨域
    jsonp(
      'https://interface.sina.cn/news/wap/fymap2020_data.d.json',
      {},
      (err, data) => {
        if (!err) {
          // 数据整理
          tempRef.current = data
          goHome(tempRef.current)
        }
      },
    )
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  function goHome(data) {
    const myChart = eCharts.init(mapRef.current)
    const mapOption = {
      title: {
        text: '中国疫情图',
        subtext: '',
        textStyle: {
          fontSize: 30,
        },
        subtextStyle: {
          fontSize: 16,
          color: '#000',
        },
        textAlign: 'left',
        top: 20,
      },
      series: [
        {
          name: '现有确诊人数',
          type: 'map', // 这是地图
          map: 'china', // 中国地图
          label: {
            // 控制对应地区的汉字
            show: true, // 显示
            color: '#333', // 字体颜色
            fontSize: 12, // 字体大小
          },
          itemStyle: {
            // 地图板块的颜色
            areaColor: '#eee', // 设置区域的颜色
          },
          emphasis: {
            // 控制划过之后的背景色和字体颜色
            label: {
              color: '#fff',
              fontSize: 12,
            },
            itemStyle: {
              areaColor: '#74b9ff',
            },
          },
          zoom: 1.1,
          data: [],
        },
      ],
      visualMap: [
        {
          // 设置分段显示的区间
          type: 'piecewise',
          show: true,
          pieces: [
            // 分段
            { min: 10000 },
            { min: 1000, max: 9999 },
            { min: 100, max: 999 },
            { min: 10, max: 99 },
            { min: 1, max: 9 },
            { value: 0 },
          ],
          // 控制分段的未知 align orient
          inRange: {
            symbol: 'rect',
            color: ['white', '#9c0505'],
          },
          itemWidth: 20,
          itemHeight: 10,
          bottom: 30,
        },
      ],
      // 鼠标移过的提示
      tooltip: {
        trigger: 'item',
        formatter: (params) => {
          return ` ${params.name}<br>现有确诊:${
            params.data?.value ?? '未知'
          }<br>累计确诊:${params.data?.allValue ?? '未知'}`
        },
      },
      toolbox: {
        show: true,
        orient: 'vertical',
        left: 'right',
        top: 'center',
        feature: {
          dataView: { readOnly: false },
          restore: {},
          saveAsImage: {},
        },
      },
    }
    const list = data.data?.list.map((item) => ({
      name: item.name,
      value: item.econNum,
      allValue: item.value,
      eName: item.ename,
    }))
    mapOption.title.subtext = data.data?.times
    mapOption.series[0].data = list
    // 挂载
    myChart.setOption(mapOption)
    myChart.on('click', function (params) {
      goProvince(params, tempRef.current)
    })
  }

  //渲染城市地图
  function goProvince(params, data) {
    import(`echarts/map/js/province/${params.data.eName}`).then(() => {
      const myChart = eCharts.init(mapRef.current)
      myChart.off('click')
      // 移除事件
      const option = {
        title: {
          text: `${params.data.name}疫情图`,
          subtext: `${data.data.times}`,
          textStyle: {
            fontSize: 30,
          },
          subtextStyle: {
            fontSize: 16,
            color: '#000',
          },
          textAlign: 'left',
          top: 20,
        },
        //左侧小导航图标
        visualMap: [
          {
            // 设置分段显示的区间
            type: 'piecewise',
            show: true,
            pieces: [
              // 分段
              { min: 10000 },
              { min: 1000, max: 9999 },
              { min: 100, max: 999 },
              { min: 10, max: 99 },
              { min: 1, max: 9 },
              { value: 0 },
            ],
            // 控制分段的未知 align orient
            inRange: {
              symbol: 'rect',
              color: ['white', '#9c0505'],
            },
            itemWidth: 20,
            itemHeight: 10,
            bottom: 30,
          },
        ],
        //配置属性
        series: [
          {
            name: '现有确诊人数',
            type: 'map',
            map: `${params.name}`, // 地图类型，支持world，china及全国34个省市自治区，例如：河北、北京
            // 是否开启滚轮缩放和拖拽漫游,默认为false（关闭），其他有效输入为true（开启），'scale'（仅开启滚轮缩放），'move'（仅开启拖拽漫游）
            label: {
              // 控制对应地区的汉字
              show: true, // 显示
              color: '#333', // 字体颜色
              fontSize: 12, // 字体大小
            },
            itemStyle: {
              // 地图板块的颜色
              areaColor: '#eee', // 设置区域的颜色
            },
            emphasis: {
              // 控制划过之后的背景色和字体颜色
              label: {
                color: '#fff',
                fontSize: 12,
              },
              itemStyle: {
                areaColor: '#74b9ff',
              },
            },
            zoom: 1.2,
            data: [], //数据
          },
        ],
        // 鼠标移过的提示
        tooltip: {
          trigger: 'item',
          formatter: (city) => {
            return ` ${city?.name ?? '未知'}<br>现有确诊${
              city?.data?.value ?? '未知'
            }<br>累计确诊${city?.data?.allValue ?? '未知'}`
          },
        },
        toolbox: {
          show: true,
          orient: 'vertical',
          left: 'right',
          top: 'center',
          feature: {
            dataView: { readOnly: false },
            restore: {},
            saveAsImage: {},
          },
        },
      }
      const list = data.data.list.map((item) => ({
        name: item.name,
        city: item.city,
        value: item.econNum,
        allValue: item.conNum,
      }))
      // 查找改省份对应的数据
      const index = list.findIndex((item) => item.name === params.name)
      const cityData = list[index].city
      const currentData = cityData.map((item) => ({
        name: item.name + '市',
        value: item.econNum,
        allValue: item.conNum,
      }))
      currentData.shift() //除去境外
      option.series[0].data = currentData
      //使用制定的配置项和数据显示图表
      myChart.setOption(option)
      //点击城市返回全国地图
      myChart.on('click', function () {
        goHome(tempRef.current)
      })
    })
  }

  return <MapContainer ref={mapRef} />
}

export default Map
