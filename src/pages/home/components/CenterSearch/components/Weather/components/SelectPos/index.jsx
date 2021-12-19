import { Cascader } from 'antd'

const SelectPos = () => {
  const options = [
    {
      value: 'test',
      label: 'haha',
    },
  ]

  const onChange = () => {
    console.log('change!')
  }

  return (
    <>
      <div>选择你所在的地区</div>
      <Cascader options={options} onChange={onChange}></Cascader>
    </>
  )
}

export default SelectPos
