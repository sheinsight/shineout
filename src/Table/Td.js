import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { tableClass } from '../styles'
import Checkbox from './Checkbox'

export const CLASS_FIXED_LEFT = 'fixed-left'
export const CLASS_FIXED_RIGHT = 'fixed-right'

class Td extends PureComponent {
  constructor(props) {
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

  renderCheckbox() {
    const { index, data, datum, treeColumnsName, treeCheckAll } = this.props
    return (
      <Checkbox
        force={datum.check(data)}
        data={data}
        index={index}
        datum={datum}
        treeColumnsName={treeCheckAll && treeColumnsName}
      />
    )
  }

  renderExpand(index) {
    const { expanded, render, data } = this.props
    if (typeof render !== 'function') return null

    let cachedRender = render(data, index)

    if (!cachedRender) return null

    if (typeof cachedRender !== 'function') {
      cachedRender = () => cachedRender
    }
    this.cachedRender = cachedRender
    return (
      <span
        className={tableClass('expand-indicator', `icon-expand-${expanded ? 'sub' : 'plus'}`)}
        onClick={this.handleExpandClick}
      />
    )
  }

  renderTreeExpand(content) {
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
    if (!treeColumnsName || !data[treeColumnsName] || (data[treeColumnsName].length === 0 && !treeEmptyExpand)) {
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

  renderResult() {
    const { render, data, index, treeColumnsName, treeExpandShow } = this.props
    const content = typeof render === 'function' ? render(data, index) : data[render]
    if (!treeColumnsName || !treeExpandShow) return content
    return this.renderTreeExpand(content)
  }

  renderContent() {
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
    const {
      rowSpan,
      colSpan,
      fixed,
      style,
      firstFixed,
      lastFixed,
      type,
      align,
      ignoreBorderRight,
      ignoreBorderBottom,
    } = this.props

    const className = classnames(
      this.props.className,
      tableClass(
        fixed === 'left' && CLASS_FIXED_LEFT,
        fixed === 'right' && CLASS_FIXED_RIGHT,
        firstFixed && 'fixed-first',
        lastFixed && 'fixed-last',
        (type === 'checkbox' || type === 'expand' || type === 'row-expand') && 'checkbox',
        align !== 'left' && `align-${align}`,
        ignoreBorderRight && 'ignore-right-border',
        ignoreBorderBottom && 'ignore-bottom-border'
      )
    )

    return (
      <td style={style} className={className} rowSpan={rowSpan} colSpan={colSpan}>
        {this.renderContent()}
      </td>
    )
  }
}

Td.propTypes = {
  data: PropTypes.object,
  colSpan: PropTypes.number,
  className: PropTypes.string,
  expanded: PropTypes.bool,
  firstFixed: PropTypes.bool,
  fixed: PropTypes.string,
  index: PropTypes.number,
  lastFixed: PropTypes.bool,
  onExpand: PropTypes.func,
  align: PropTypes.oneOf(['left', 'center', 'right']),
  originKey: PropTypes.any,
  rowSpan: PropTypes.number,
  style: PropTypes.object,
  type: PropTypes.string,
  expandKeys: PropTypes.array,
  expandClick: PropTypes.func,
  datum: PropTypes.object,
  render: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
  ignoreBorderRight: PropTypes.bool,
  ignoreBorderBottom: PropTypes.bool,
  treeColumnsName: PropTypes.string,
  onTreeExpand: PropTypes.func,
  treeExpand: PropTypes.bool,
  treeExpandShow: PropTypes.bool,
  treeExpandLevel: PropTypes.object,
  treeIndent: PropTypes.number,
  treeRoot: PropTypes.bool,
  treeEmptyExpand: PropTypes.bool,
  treeCheckAll: PropTypes.bool,
  resetFixAuto: PropTypes.func,
}

Td.defaultProps = {
  fixed: '',
  style: {},
  align: 'left',
}

export default Td
