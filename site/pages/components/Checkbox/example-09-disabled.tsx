/**
 * cn - 禁用
 *    -- 设置 Checkbox.Group 的 disabled 为 true，禁用全部选项
 * en - Disabled
 *    -- Set the disabled property of Checkbox.Group to true, disable all the checkboxes.
 */
import React from 'react'
import { Checkbox, TYPE } from 'shineout'

type DataItem = string
type CheckboxGroupProps = TYPE.Checkbox.GroupProps<DataItem, string>
type CheckboxGroupData = CheckboxGroupProps['data']

const data: CheckboxGroupData = ['red', 'orange', 'yellow', 'green', 'cyan', 'blue', 'violet']

const App: React.FC = () => (
  <div>
    <Checkbox.Group disabled keygen data={data} defaultValue={['blue', 'cyan']} renderItem={d => d} />
    <br />
    <Checkbox disabled checked={false}>
      not checked
    </Checkbox>
    <Checkbox disabled checked>
      checked
    </Checkbox>
    <Checkbox disabled checked="indeterminate">
      indeterminate
    </Checkbox>
  </div>
)

export default App
