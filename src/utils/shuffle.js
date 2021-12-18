export const shuffle = (arr) => {
  //数组随机打乱
  let m = arr.length,
    i
  while (m) {
    i = (Math.random() * m--) >>> 0
    ;[arr[m], arr[i]] = [arr[i], arr[m]]
  }
  return arr
}
