import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { getProps, defaultProps } from '../utils/proptypes'
import hash from '../utils/hash'
import { tableClass } from '../styles'
import SimpleTable from './SimpleTable'
import SeperateTable from './SeperateTable'
import { CLASS_FIXED_LEFT, CLASS_FIXED_RIGHT } from './Td'

class Table extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      scrollLeft: 0,
      scrollRight: 0,
    }

    this.bindTable = this.bindTable.bind(this)
    this.handleScrollLeft = this.handleScrollLeft.bind(this)
  }

  componentDidMount() {
    // this.setFixed()
  }

  setFixed() {
    const { scrollLeft, scrollRight } = this.state

    this.table.querySelectorAll(`.${CLASS_FIXED_RIGHT}`)
      .forEach((td) => { td.style.transform = `translateX(${scrollRight}px)` })
    this.table.querySelectorAll(`.${CLASS_FIXED_LEFT}`)
      .forEach((td) => { td.style.transform = `translateX(${scrollLeft}px)` })
  }

  handleScrollLeft(scrollLeft, scrollRight) {
    this.setState({ scrollLeft, scrollRight }, () => {
      this.setFixed()
    })
  }

  bindTable(el) {
    this.table = el
  }

  renderSimple() {
    const { columns, children, data } = this.props

    return (
      <SimpleTable
        columns={columns}
        data={data}
      >
        {children}
      </SimpleTable>
    )
  }

  render() {
    const {
      striped, bordered, size, hover, height, columns, children,
      data, style, fixed, width,
    } = this.props

    const { scrollLeft, scrollRight } = this.state

    const className = classnames(
      tableClass(
        '_',
        size,
        hover && !striped && 'hover',
        striped && 'striped',
        bordered && 'bordered',
        fixed && 'fixed',
        scrollLeft > 0 && 'left-float',
        scrollRight < 0 && 'right-float',
      ),
      this.props.className,
    )

    const props = {
      height,
      width,
      data,
      columns,
      scrollLeft,
      onScrollLeft: this.handleScrollLeft,
    }

    return (
      <div className={className} ref={this.bindTable} style={style}>
        {
          fixed
          ? <SeperateTable {...props} />
          : <SimpleTable {...props}>{children}</SimpleTable>
        }
      </div>
    )
  }
}

Table.propTypes = {
  ...getProps('size', 'type', 'keygen'),
  bordered: PropTypes.bool,
  children: PropTypes.any,
  columns: PropTypes.array,
  data: PropTypes.array,
  fixed: PropTypes.bool,
  height: PropTypes.number,
  hover: PropTypes.bool,
  loading: PropTypes.bool,
  striped: PropTypes.bool,
  width: PropTypes.number,
}

Table.defaultProps = {
  ...defaultProps,
  fixed: false,
  hover: true,
}

const handleColumns = T => ({ columns, ...props }) => {
  if (!columns) return <T {...props} />

  let left = -1
  let right = -1
  columns.forEach((c, i) => {
    if (c.fixed === 'left') left = i
    if (c.fixed === 'right' && right < 0) right = i
  })

  const cols = columns.map((c, i) => {
    const nc = Object.assign({
      lastFixed: i === left,
      firstFixed: i === right,
    }, c)
    if (!nc.key) nc.key = hash(c)
    if (i <= left) nc.fixed = 'left'
    if (i >= right && right > 0) nc.fixed = 'right'
    return nc
  })

  return <T columns={cols} {...props} />
}

export default handleColumns(Table)
