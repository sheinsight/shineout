import React, { PureComponent, ReactNode } from 'react'
import classnames from 'classnames'
import { tableClass } from './styles'
import Checkbox from './Checkbox'
import { TdProps } from './Props'

export const CLASS_FIXED_LEFT = 'fixed-left'
export const CLASS_FIXED_RIGHT = 'fixed-right'

const DefaultProps: any = {
  fixed: '',
  style: {},
  align: 'left',
}
class Td<DataItem, Value> extends PureComponent<TdProps<DataItem, Value>> {
  static defaultProps = DefaultProps

  cachedRender: () => ReactNode

  constructor(props: TdProps<DataItem, Value>) {
    super(props)
    this.handleExpandClick = this.handleExpandClick.bind(this)
    this.handleTreeExpand = this.handleTreeExpand.bind(this)
  }

  handleExpandClick() {
    const { originKey, expanded, data, expandKeys, expandClick, resetFixAuto } = this.props
    if (expandKeys) {
      if (expandClick) expandClick(data, !expanded)
    } else {
      this.props.onExpand(originKey, expanded ? undefined : this.cachedRender)
    }
    resetFixAuto(true)
  }

  handleTreeExpand() {
    const { data, onTreeExpand, index } = this.props
    onTreeExpand(data, index)
  }

  renderCheckbox(): ReactNode {
    const { index, data, datum, treeColumnsName, treeCheckAll, disabled, render } = this.props
    const checkbox = (
      <Checkbox
        force={datum.check(data)}
        data={data}
        index={index}
        datum={datum}
        disabled={disabled}
        treeColumnsName={treeCheckAll ? treeColumnsName : undefined}
      />
    )
    if (render && typeof render === 'function') {
      return render(data, index, checkbox) as ReactNode
    }
    return checkbox
  }

  renderExpand(index: number) {
    const { expanded, render, data } = this.props
    if (typeof render !== 'function') return null

    let cachedRender = render(data, index) as () => ReactNode

    if (!cachedRender) return null

    if (typeof cachedRender !== 'function') {
      cachedRender = () => cachedRender as ReactNode
    }
    this.cachedRender = cachedRender
    return (
      <span
        className={tableClass('expand-indicator', `icon-expand-${expanded ? 'sub' : 'plus'}`)}
        onClick={this.handleExpandClick}
      />
    )
  }

  renderTreeExpand(content: ReactNode) {
    const {
      data,
      treeRoot,
      treeColumnsName,
      treeExpand,
      originKey,
      treeExpandLevel,
      treeIndent,
      treeEmptyExpand,
    } = this.props
    const level = treeExpandLevel.get(originKey) || 0
    const className = tableClass('expand-wrapped')
    if (
      !treeColumnsName ||
      !data[treeColumnsName] ||
      (((data[treeColumnsName] as unknown) as DataItem[]).length === 0 && !treeEmptyExpand)
    ) {
      return (
        <span className={className} style={{ marginLeft: level * treeIndent, paddingLeft: treeRoot ? 0 : 25 }}>
          {content}
        </span>
      )
    }
    return (
      <span className={className} style={{ marginLeft: level * treeIndent }}>
        <span
          key="expand-icon"
          onClick={this.handleTreeExpand}
          className={tableClass('icon-tree-expand', `icon-tree-${treeExpand ? 'sub' : 'plus'}`)}
        />
        {content}
      </span>
    )
  }

  renderResult(): ReactNode {
    const { render, data, index, treeColumnsName, treeExpandShow } = this.props
    const content =
      typeof render === 'function'
        ? (render(data, index) as ReactNode)
        : ((data[render as keyof DataItem] as unknown) as ReactNode)
    if (!treeColumnsName || !treeExpandShow) return content
    return this.renderTreeExpand(content)
  }

  renderContent(): ReactNode {
    const { type, index } = this.props
    switch (type) {
      case 'checkbox':
        return this.renderCheckbox()
      case 'expand':
      case 'row-expand':
        return this.renderExpand(index)
      default:
        return this.renderResult()
    }
  }

  render() {
    const { rowSpan, colSpan, fixed, style, firstFixed, lastFixed, type, align, ignoreBorderRight } = this.props

    const className = classnames(
      this.props.className,
      tableClass(
        fixed === 'left' && CLASS_FIXED_LEFT,
        fixed === 'right' && CLASS_FIXED_RIGHT,
        firstFixed && 'fixed-first',
        lastFixed && 'fixed-last',
        (type === 'checkbox' || type === 'expand' || type === 'row-expand') && 'checkbox',
        align !== 'left' && `align-${align}`,
        ignoreBorderRight && 'ignore-right-border'
      )
    )

    return (
      <td style={style} className={className} rowSpan={rowSpan} colSpan={colSpan}>
        {this.renderContent()}
      </td>
    )
  }
}

export default Td
