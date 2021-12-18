import dayjs from 'dayjs'

// 该函数主要是用于生成一个新的时间戳
export const shiftDate = (date, numDays) => {
  const newDate = new Date(date)
  newDate.setDate(newDate.getDate() + numDays)
  return newDate
}

// 创建一个不同层次但共包含一年总天数的数组，作用是为了处理日历上的日期
export const getRange = (count) => {
  return Array.from({ length: count }, (_, i) => i)
}

// 返回一个从一年第一天到最后一天的数组
export const getAllDays = (allDays, endDay) => {
  // 判断当前的年份，并且要判断出是平年还是闰年，最终再决定这个天数
  const allDaysArr = getRange(allDays).map((index) => {
    return {
      date: new Date(shiftDate(endDay, -index)),
      count: 0,
    }
  })
  // allDaysArr.reverse()
  return allDaysArr
}

// 该函数用于获取当前年份并返回一年中的总天数和结束日期等数据
export const getDaysInfoInYear = () => {
  const nowTime = new Date()
  const nowYear = nowTime.getFullYear()
  // 当new Date()第三个参数为0时可以获取指定年份年2月份的天数，如果2月份的最后一天是29，那么该年就是闰年 ,否则为平年，最终可得到一天准确天数
  const allDays = new Date(nowYear, 2, 0).getDate() === 28 ? 365 : 366
  const endDay = new Date(`${nowYear}-12-31`)

  return {
    nowYear,
    allDays,
    endDay,
  }
}

// 通过日期字符串获取日期上的年份、月份以及天数
export const getMonthAndDay = (dateStr) => {
  dateStr = dayjs(dateStr).format('YYYY-MM-DD HH:mm:ss')
  const dateArr = dateStr.split('-')
  return {
    day: parseInt(dateArr[2]),
    month: parseInt(dateArr[1]),
    year: parseInt(dateArr[0]),
  }
}

// 根据日期获取这天是周几
export const getWhatDay = (dateStr) => {
  const dateArr = dateStr.split('-')
  const date = new Date(dateArr[0], parseInt(dateArr[1] - 1), dateArr[2])
  const dayNum = date.getDay() // 这样就可以获取到现在是一周的第几天，周日返回的是0，周一返回的是1....
  return dayNum
}

// 该函数用于返回一年中阅读时间最长周末的起始日期、结束日期以及阅读时间总和
export const getLongestWeek = (yearlyArr) => {
  // 获取该年中第一天是星期几
  if (!yearlyArr.length) return
  const dayNum = getWhatDay(
    dayjs(yearlyArr[0].date).format('YYYY-MM-DD HH:mm:ss').slice(0, 10),
  )

  // 判断该年的第一天是否为周一
  let startIndex = 0
  if (!dayNum) {
    // 说明第一天是周日
    startIndex = 1
  } else if (dayNum === 1) {
    // 说明第一天是周一
    startIndex = 0
  } else {
    startIndex = 8 - dayNum
  }

  // 定义周末阅读最长时间变量和周末开始时对应数组的下标值
  let maxTime = 0
  let maxTimeStartIndex = startIndex

  // 计算用户一年中周末阅读的最长时间以及该周末在数组上对应的下标
  for (
    let i = startIndex, len = yearlyArr.length - startIndex - 6;
    i < len;
    i = i + 7
  ) {
    let sum = 0
    for (let j = i; j < i + 7; j++) {
      sum += yearlyArr[j].count
    }
    if (maxTime < sum) {
      maxTimeStartIndex = i
      maxTime = sum
    }
  }
  // 获取到最大阅读时间周末的起始日期和结束日期
  const startDay = yearlyArr[maxTimeStartIndex].date
  const endDay = yearlyArr[maxTimeStartIndex + 6].date

  // 将这一星期每一天对应的阅读数据放到数组中去
  const dataArr = []
  for (let i = maxTimeStartIndex, len = maxTimeStartIndex + 7; i < len; i++) {
    dataArr.push(yearlyArr[i].count)
  }
  return {
    startDay,
    endDay,
    maxTime,
    dataArr,
  }
}
