import React, { PureComponent } from 'react'
import Select from '../Select'
import { paginationClass } from './styles'
import { getDirectionClass } from '../utils/classname'
import { PageSizeListProps } from './Props'

const DefaultValue = {
  pageSizeList: [10, 20, 30, 50, 100],
}

class PageSizeList extends PureComponent<PageSizeListProps> {
  static defaultProps = DefaultValue

  constructor(props: PageSizeListProps) {
    super(props)

    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(pageSize: number) {
    const { current, onChange } = this.props
    const start = (current - 1) * this.props.pageSize + 1

    onChange(Math.ceil(start / pageSize), pageSize)
  }

  render() {
    const { pageSize, pageSizeList = DefaultValue.pageSizeList, text, disabled, size, sizeListProps = {} } = this.props

    return (
      <Select
        onChange={this.handleChange}
        disabled={disabled}
        absolute
        autoAdapt
        keygen
        value={pageSize}
        size={size}
        className={paginationClass(getDirectionClass('section'), 'pagesize')}
        data={pageSizeList}
        renderItem={d => `${d} ${text.page || ''}`}
        {...sizeListProps}
      />
    )
  }
}

export default PageSizeList
