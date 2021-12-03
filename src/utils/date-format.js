// 该函数主要是用于生成一个新的时间戳
export function shiftDate(date, numDays) {
  const newDate = new Date(date);
  newDate.setDate(newDate.getDate() + numDays);
  return newDate;
}

// 创建一个不同层次但共包含一年总天数的数组，作用是为了处理日历上的日期
export function getRange(count) {
  return Array.from({ length: count }, (_, i) => i);
}

// 生成随记数的函数
export function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// 该函数用于获取当前年份并返回一天中的总天数和结束日期等数据
export function getDaysInfoInYear() {
  const nowTime = new Date()
  const nowYear = nowTime.getFullYear()
  // 当new Date()第三个参数为0时可以获取指定年份年2月份的天数，如果2月份的最后一天是29，那么该年就是闰年 ,否则为平年，最终可得到一天准确天数
  const allDays = new Date(nowYear, 2, 0).getDate() === 28 ? 365 : 366
  const endDay = new Date(`${nowYear}-12-31`);

  return {
    nowYear,
    allDays,
    endDay
  }
}