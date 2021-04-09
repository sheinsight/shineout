import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { Component } from '../component'
import { getLocale } from '../locale'
import { compose } from '../utils/func'
import { getProps, defaultProps } from '../utils/proptypes'
import { tableClass } from '../styles'
import fixedAuto from './fixedAuto'
import Datum from '../Datum'
import Spin from '../Spin'
import resizableHOC from './resizable'
import { consumer as hideableConsumer } from '../hoc/hidable'
import SeperateTable from './SeperateTable'
import SimpleTable from './SimpleTable'
import { ROW_HEIGHT_UPDATE_EVENT } from './Tr'
import { RENDER_COL_GROUP_EVENT } from './Tbody'
import select from './select'

const ResizeSeperateTable = resizableHOC(SeperateTable)
const ResizeSimpleTable = resizableHOC(SimpleTable)

const RadioWrapper = Origin => props => (
  // eslint-disable-next-line react/prop-types
  <Origin {...props} distinct limit={props.radio ? 1 : 0} />
)

class Table extends Component {
  constructor(props) {
    super(props)
    this.state = {
      scrollLeft: 0,
      scrollRight: 0,
    }

    this.bindTable = this.bindTable.bind(this)
  }

  componentDidUpdate() {
    const { datum } = this.props
    datum.dispatch(ROW_HEIGHT_UPDATE_EVENT)
    datum.dispatch(RENDER_COL_GROUP_EVENT)
  }

  getRowsInView() {
    const { rowsInView, data, fixed } = this.props
    const dataLength = data.length
    if (rowsInView <= 0 || rowsInView > dataLength || fixed === 'x') return dataLength
    return parseInt(rowsInView, 10)
  }

  bindTable(el) {
    const { bindWrapper } = this.props
    this.table = el
    if (el && bindWrapper) bindWrapper(el)
  }

  render() {
    const {
      striped,
      bordered,
      size,
      hover,
      height,
      columns,
      value,
      children,
      empty,
      data,
      style,
      fixed,
      width,
      loading,
      verticalAlign,
      columnResizable,
      events,
      ...others
    } = this.props

    const { scrollLeft, scrollRight } = this.state

    const className = classnames(
      tableClass(
        '_',
        size,
        hover && 'hover',
        bordered && 'bordered',
        fixed && 'fixed',
        scrollLeft > 0 && 'left-float',
        scrollRight < 0 && 'right-float',
        `vertical-${verticalAlign}`,
        columnResizable && 'resize',
        others.sticky && 'sticky'
      ),
      this.props.className
    )

    const props = {
      ...others,
      children,
      fixed,
      rowsInView: this.getRowsInView(),
      loading,
      height,
      width,
      data,
      columns,
      striped,
      bordered,
      columnResizable,
    }

    const isEmpty = (!data || data.length === 0) && !children
    const useSeparate = fixed && !isEmpty
    const ResizeSepTable = columnResizable ? ResizeSeperateTable : SeperateTable
    const ResizeSimTable = columnResizable ? ResizeSimpleTable : SimpleTable
    const RenderTable = useSeparate ? ResizeSepTable : ResizeSimTable
    const newStyle = Object.assign({}, style)
    if (height) newStyle.height = height
    if (useSeparate && !newStyle.height) newStyle.height = '100%'
    if (loading) newStyle.overflow = 'hidden'

    return (
      <div className={className} ref={this.bindTable} style={newStyle} {...events}>
        <RenderTable {...props} />
        {loading && (
          <div className={tableClass('loading')}>{typeof loading === 'boolean' ? <Spin size={40} /> : loading}</div>
        )}
        {isEmpty && (
          <div className={tableClass('empty')}>
            <span>{empty || getLocale('noData')}</span>
          </div>
        )}
      </div>
    )
  }
}

Table.propTypes = {
  ...getProps(PropTypes, 'size', 'type', 'keygen'),
  bordered: PropTypes.bool,
  children: PropTypes.any,
  columns: PropTypes.array,
  data: PropTypes.array,
  empty: PropTypes.any,
  fixed: PropTypes.oneOf(['x', 'y', 'both']),
  height: PropTypes.number,
  hover: PropTypes.bool,
  loading: PropTypes.oneOfType([PropTypes.element, PropTypes.bool]),
  rowsInView: PropTypes.number,
  striped: PropTypes.bool,
  verticalAlign: PropTypes.oneOf(['top', 'middle']),
  width: PropTypes.number,
  columnResizable: PropTypes.bool,
  bindWrapper: PropTypes.func,
}

Table.defaultProps = {
  ...defaultProps,
  hover: true,
  rowsInView: 20,
  verticalAlign: 'top',
  columns: [],
}

export default compose(
  RadioWrapper,
  Datum.hoc({
    bindProps: ['disabled', 'format', 'prediction', 'limit', 'distinct'],
    ignoreUndefined: true,
    setValueType: null,
    pure: false,
  }),
  fixedAuto,
  hideableConsumer,
  select
)(Table)
