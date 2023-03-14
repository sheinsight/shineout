import React, { ComponentType } from 'react'
import classnames from 'classnames'
import { isRTL } from '../config'
import { Component } from '../component'
import { getLocale } from '../locale'
import { compose } from '../utils/func'
import { getDirectionClass } from '../utils/classname'
import { tableClass } from './styles'
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
import { GetRadioProps, OriginTableProps, TableDatumBindKey, TableType } from './Props'

const ResizeSeperateTable = resizableHOC(SeperateTable)
const ResizeSimpleTable = resizableHOC(SimpleTable)

const RadioWrapper = <Props extends { limit: any; distinct: any }>(
  Origin: ComponentType<Props>
): React.FC<GetRadioProps<Props>> => props => <Origin {...props as Props} distinct limit={props.radio ? 1 : 0} />

interface FormState {
  scrollLeft: number
  scrollRight: number
  inView: boolean
}
const DefaultProps = {
  hover: true,
  rowsInView: 20,
  verticalAlign: 'top',
  columns: [],
  size: 'default',
}
class Table<DataItem, Value> extends Component<OriginTableProps<DataItem, Value>, FormState> {
  table: HTMLElement

  visibleObserver: IntersectionObserver | null

  static defaultProps = DefaultProps

  constructor(props: OriginTableProps<DataItem, Value>) {
    super(props)
    this.state = {
      scrollLeft: 0,
      scrollRight: 0,
      inView: false,
    }

    this.bindTable = this.bindTable.bind(this)
  }

  componentDidMount() {
    if (this.props.sticky && this.table && global.IntersectionObserver) {
      const observer = new IntersectionObserver(entries => {
        const entry = entries[0]
        this.setState({
          inView: entry.intersectionRatio > 0,
        })
      })
      observer.observe(this.table)
      this.visibleObserver = observer
    }
  }

  componentDidUpdate(preProps: OriginTableProps<DataItem, Value>) {
    const { datum, treeCheckAll } = this.props
    datum.dispatch(ROW_HEIGHT_UPDATE_EVENT)
    datum.dispatch(RENDER_COL_GROUP_EVENT)
    if (treeCheckAll && this.props.data !== preProps.data) {
      datum.cleanDataCache()
    }
  }

  componentWillUnmount() {
    if (this.visibleObserver) {
      this.visibleObserver.disconnect()
      this.visibleObserver = null
    }
  }

  getRowsInView() {
    const { rowsInView = DefaultProps.rowsInView, data, fixed } = this.props
    const dataLength = data.length
    if (rowsInView <= 0 || rowsInView > dataLength || fixed === 'x') return dataLength
    return parseInt(String(rowsInView), 10)
  }

  getShouldSticky() {
    return this.state.inView && this.props.sticky
  }

  bindTable(el: HTMLDivElement) {
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
      // value,
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
        this.getShouldSticky() && 'sticky',
        isRTL() && 'rtl'
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
        <RenderTable {...props} bordered={bordered} sticky={this.getShouldSticky()} />
        {loading && (
          <div className={tableClass('loading')}>{typeof loading === 'boolean' ? <Spin size={40} /> : loading}</div>
        )}
        {isEmpty && (
          <div
            className={tableClass(getDirectionClass('empty'))}
            style={{ visibility: loading ? 'hidden' : 'visible' }}
          >
            <span>{empty || getLocale('noData')}</span>
          </div>
        )}
      </div>
    )
  }
}

const bindKeys: TableDatumBindKey[] = ['disabled', 'format', 'prediction', 'limit', 'distinct']
export default compose(
  RadioWrapper,
  Datum.hoc({
    bindProps: bindKeys,
    ignoreUndefined: true,
    setValueType: null,
    pure: false,
  }),
  fixedAuto,
  hideableConsumer,
  select
)(Table) as TableType
