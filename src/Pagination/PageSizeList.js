import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import Dropdown from '../Dropdown'
import { paginationClass } from '../styles'

class PageSizeList extends PureComponent {
  getMenu() {
    const { text, pageSizeList } = this.props
    return pageSizeList.map(p => ({
      content: `${p} ${text.page || ''}`,
      pageSize: p,
    }))
  }

  handleChange(ps) {
    const { current, pageSize, onChange } = this.props
    const start = ((current - 1) * pageSize) + 1
    onChange(Math.ceil(start / ps), ps)
  }

  render() {
    const { pageSize, text, disabled } = this.props

    return (
      <Dropdown
        disabled={disabled}
        placeholder={`${pageSize} ${text.page || ''}`}
        className={paginationClass('section')}
        data={this.getMenu()}
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
