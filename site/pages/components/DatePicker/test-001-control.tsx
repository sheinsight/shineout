/**
 * cn - 完全受控
 *    -- 通过封装实现完全受控
 * en - 完全受控
 *    -- 通过封装实现完全受控
 */
import React from 'react'
import { DatePicker } from 'shineout'

const App = (props: any) => {
  const [v, setV] = React.useState()
  React.useEffect(
    () => {
      console.log(v, props.value)
      if (props.value !== v) {
        setV(props.value)
      }
    },
    [v, props.value]
  )
  return (
    <DatePicker
      type="date"
      placeholder="Select date"
      {...props}
      value={v}
      onChange={(d: any, ...rest) => {
        setV(d)
        props.onChange(d, ...rest)
      }}
    />
  )
}

const App1 = () => {
  const [v, setV] = React.useState<string | Date>()
  return (
    <App
      value={v}
      onChange={(d: string) => {
        const arr = d.split('-').map(i => Number.parseInt(i, 10))
        const date = new Date(arr[0], arr[1] - 1, arr[2])
        if (date.valueOf() > Date.now()) {
          setV(new Date())
        } else {
          setV(d)
        }
      }}
    />
  )
}

export default App1
