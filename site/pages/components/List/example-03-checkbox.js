/**
 * cn - 选择行
 *    -- 设置 onChange 属性，会自动添加选择行
 * en - Select
 *    -- Set the onChange property will automatically add a row with checkbox.
 */
import React from 'react'
import { List, Checkbox } from 'shineout'
import { fetch } from 'doc/data/user'

class Index extends React.Component {
  constructor() {
    super()
    this.state = {
      value: [1],
      loading: false,
      // eslint-disable-next-line react/no-unused-state
      current: 1,
    }

    this.renderItem = this.renderItem.bind(this)
    this.onChange = this.onChange.bind(this)
    this.getChecked = this.getChecked.bind(this)
    this.checkboxOnChange = this.checkboxOnChange.bind(this)

    this.fetchData = this.fetchData.bind(this)

    this.data = []
  }

  componentDidMount() {
    this.fetchData(1)
  }

  onChange(selectedValue) {
    console.log('selectValue: ', selectedValue)
    this.setState({ value: selectedValue })
  }

  getChecked() {
    const { value } = this.state
    if (!value || value.length <= 0) return false
    if (value.length === this.data.length) return true
    return 'indeterminate'
  }

  checkboxOnChange(flag) {
    if (flag) {
      this.setState({
        value: this.data.map(v => v.id),
      })
      return
    }
    this.setState({
      value: [],
    })
  }

  fetchData(current) {
    this.setState({ loading: true })
    fetch.get('List', { current, pageSize: 10 }).then(data => {
      this.data = [...this.data, ...data.data]
      this.setState({
        loading: false,
        // eslint-disable-next-line react/no-unused-state
        current,
      })
    })
  }

  // eslint-disable-next-line class-methods-use-this
  renderItem(rowData) {
    return <div>{`From ${rowData.country}. Name: ${rowData.firstName}-${rowData.lastName}`}</div>
  }

  render() {
    const { value, loading } = this.state
    const style = {
      display: 'flex',
      justifyContent: 'flex-start',
      alignItems: 'center',
      padding: 12,
      lineHeight: '22px',
      borderBottom: '1px solid #e8ebf0',
    }
    return (
      <div>
        <div style={style}>
          <Checkbox checked={this.getChecked()} onChange={this.checkboxOnChange} />
          <div>{`Selected ${value.length}`}</div>
        </div>
        <List
          loading={loading}
          keygen="id"
          data={this.data}
          renderItem={this.renderItem}
          onChange={this.onChange}
          format="id"
          value={value}
        />
      </div>
    )
  }
}

export default Index
