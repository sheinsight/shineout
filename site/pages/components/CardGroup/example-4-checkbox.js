/**
 * cn - 多选
 *    -- 使用 checked 使 Item 支持多选
 * en - Checkbox
 *    -- set checked to support checkbox
 */
import React from 'react'
import { CardGroup, Checkbox } from 'shineout'
import Icon from '../Icon/Shineout'

const data = [
  {
    title: 'Tags',
    icon: 'star',
    color: '#197AFA',
  },
  {
    title: 'Set Owner',
    icon: 'phone-fill',
    color: '#7A5AF7',
  },
  {
    title: 'Set Property',
    icon: 'email-fill',
    color: '#FFA940',
  },
  {
    title: 'Score',
    icon: 'jubaoyichang',
    color: '#74D13D',
  },
  {
    title: 'Add Deal',
    icon: 'selection',
    color: '#16B2EB',
  },
  {
    title: 'Add Task',
    icon: 'charge',
    color: '#FF4D50',
  },
  {
    title: 'Send',
    icon: 'send',
    color: '#27AE60',
  },
  {
    title: 'Info',
    icon: 'warning',
    color: '#2980B9',
  },
  {
    title: 'Success',
    icon: 'check-circle',
    color: '#A569BD',
  },
  {
    title: 'Filter',
    icon: 'filter',
    color: '#99A3A4',
  },
]

function Item({ title, icon, color }) {
  return (
    <div style={{ padding: 20 }}>
      <div>
        <div style={{ width: 40, height: 40, display: 'inline-flex', borderRadius: '50%', background: `${color}20` }}>
          <Icon name={icon} fontSize={14} style={{ margin: 'auto', color }} />
        </div>
        <span style={{ marginInlineStart: 12, fontSize: 16, fontWeight: 500, color: 'rgba(51,62,89,1)' }}>{title}</span>
      </div>
      <p style={{ margin: '20px 0', fontSize: 14, color: 'rgba(153,157,168,1)' }}>
        Add or delete tag for your customer. You can sort your customer...
      </p>
      <div style={{ color: 'rgba(102,108,124,1)' }}>
        <Icon name="plus" style={{ marginInlineEnd: 6 }} />
        Add This
      </div>
    </div>
  )
}

export default class extends React.Component {
  state = {
    values: ['Tags'],
  }

  constructor(props) {
    super(props)
    this.handleChange = this.handleChange.bind(this)
    this.handleSelectAll = this.handleSelectAll.bind(this)
  }

  handleChange(checked, v) {
    const { values } = this.state
    this.setState({
      values: checked ? values.concat(v) : values.filter(item => item !== v),
    })
  }

  handleSelectAll(_, checked) {
    this.setState({
      values: checked ? data.map(v => v.title) : [],
    })
  }

  render() {
    const { values } = this.state
    const totalStatus = values.length !== 0 ? (values.length === data.length ? true : 'indeterminate') : false
    return (
      <div>
        <p style={{ margin: 8, padding: '8px 16px', background: 'rgba(130, 130, 130, .1)', borderRadius: 10 }}>
          <Checkbox checked={totalStatus} onChange={this.handleSelectAll}>
            全选
          </Checkbox>
        </p>
        <CardGroup height={300}>
          {data.map(v => (
            <CardGroup.Item
              key={v.title}
              value={v.title}
              checked={values.includes(v.title)}
              onChange={this.handleChange}
            >
              <Item {...v} />
            </CardGroup.Item>
          ))}
        </CardGroup>
      </div>
    )
  }
}
