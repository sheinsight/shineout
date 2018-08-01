import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import Select from '../Select'
import { paginationClass } from '../styles'

class PageSizeList extends PureComponent {
  constructor(props) {
    super(props)

    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(pageSize) {
    const { current, onChange } = this.props
    const start = ((current - 1) * this.props.pageSize) + 1
    onChange(Math.ceil(start / pageSize), pageSize)
  }

  render() {
    const {
      pageSize, pageSizeList, text, disabled,
    } = this.props

    return (
      <Select
        onChange={this.handleChange}
        disabled={disabled}
        keygen
        value={pageSize}
        className={paginationClass('section', 'pagesize')}
        data={pageSizeList}
        renderItem={d => `${d} ${text.page || ''}`}
      />
    )
  }
}

PageSizeList.propTypes = {
  current: PropTypes.number.isRequired,
  disabled: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
  pageSize: PropTypes.number.isRequired,
  pageSizeList: PropTypes.array,
  text: PropTypes.object.isRequired,
}

PageSizeList.defaultProps = {
  pageSizeList: [10, 20, 30, 50, 100],
}

export default PageSizeList
