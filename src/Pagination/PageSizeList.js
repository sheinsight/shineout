import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import Dropdown from '../Dropdown'
import { paginationClass } from '../styles'

class PageSizeList extends PureComponent {
  handleChange(ps) {
    const { current, pageSize, onChange } = this.props
    const start = ((current - 1) * pageSize) + 1
    onChange(Math.ceil(start / ps), ps)
  }

  render() {
    const { pageSize, pageSizeList, text } = this.props

    return (
      <Dropdown
        placeholder={`${pageSize} ${text.page || ''}`}
        className={paginationClass('section')}
      >
        {
          pageSizeList.map(ps => (
            <a
              key={ps}
              href="javascript:;"
              onClick={this.handleChange.bind(this, ps)}
            >
              {ps} {text.page}
            </a>
          ))
        }
      </Dropdown>
    )
  }
}

PageSizeList.propTypes = {
  current: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
  pageSize: PropTypes.number.isRequired,
  pageSizeList: PropTypes.array,
  text: PropTypes.object.isRequired,
}

PageSizeList.defaultProps = {
  pageSizeList: [10, 20, 30, 50, 100],
}

export default PageSizeList
