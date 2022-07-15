/**
 * cn - 可清空
 *    -- clearable 属性为 true 时，hover 后会显示清空图标。
 * en - Clearable
 *    -- Set the clearable property to true, the clear icon will be displayed on hover.
 */
import React from 'react'
import { Select, TYPE } from 'shineout'

type SelectItem = string
type SelectProps = TYPE.Select.Props<SelectItem, string>
type SelectResultClassName = SelectProps['resultClassName']

const style: React.CSSProperties = { width: 240, marginBottom: 12 }
const data: SelectItem[] = ['red', 'orange', 'yellow', 'green', 'cyan', 'blue', 'violet']

const App: React.FC = () => {
  const resultClassName: SelectResultClassName = value => {
    console.log('resultClassName value: ', value)
    return `result-class-name-${value}`
  }

  return (
    <div>
      <Select style={style} clearable keygen data={data} placeholder="Select color" />
      <br />
      <Select
        keygen
        multiple
        clearable
        data={data}
        style={{ width: 300 }}
        placeholder="Multiple select"
        resultClassName={resultClassName}
      />
    </div>
  )
}

export default App
