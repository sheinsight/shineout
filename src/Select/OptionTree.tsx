import React, { Component } from 'react'
import { getDirectionClass } from '../utils/classname'
import List from '../AnimationList'
import Tree from '../Tree'
import Spin from '../Spin'
import { getLocale } from '../locale'
import { selectClass } from './styles'
import { getCustomList } from './utils'
import { OptionTreeProps } from './Props'

const ScaleList = List(['fade', 'scale-y'], 'fast')
const DATA_PATH_KEY = '$PATH'

class OptionList<Item, Value> extends Component<OptionTreeProps<Item, Value>> {
  constructor(props: OptionTreeProps<Item, Value>) {
    super(props)

    this.handleClick = this.handleClick.bind(this)
  }

  getText(key: string) {
    return this.props.text[key as keyof typeof this.props.text] || getLocale(key)
  }

  handleClick(data: Item, _: any, p: { path: string }) {
    const { path } = p
    const { datum, onChange } = this.props
    if (datum.disabled(data)) return
    onChange(null, { ...data, [DATA_PATH_KEY]: path })
  }

  renderItem(data: Item) {
    const { renderItem, datum } = this.props
    const content = renderItem(data)
    return (
      <span
        title={typeof content === 'string' ? content : undefined}
        className={selectClass(
          'tree-node',
          datum.check(data) && 'selected',
          datum.disabled(data) && getDirectionClass('disabled')
        )}
      >
        {content}
      </span>
    )
  }

  renderTree() {
    const {
      loading,
      treeData,
      keygen,
      onExpand,
      loader,
      expanded,
      defaultExpanded,
      defaultExpandAll,
      renderPending,
      childrenKey,
      expandIcons,
      emptyText,
    } = this.props
    if (loading)
      return (
        <span className={selectClass(getDirectionClass('option'))}>
          {typeof loading === 'boolean' ? <Spin size={20} /> : loading}
        </span>
      )
    if (treeData.length === 0 || renderPending)
      return <span className={selectClass(getDirectionClass('option'))}>{emptyText || this.getText('noData')}</span>
    return (
      <div className={selectClass('tree-wrapper')}>
        <Tree
          radioUpdate
          onClick={this.handleClick as any}
          line={false}
          data={treeData}
          keygen={keygen as any}
          renderItem={this.renderItem.bind(this)}
          onExpand={onExpand}
          loader={loader}
          expanded={expanded}
          defaultExpandAll={defaultExpandAll}
          defaultExpanded={defaultExpanded}
          childrenKey={childrenKey as any}
          expandIcons={expandIcons}
        />
      </div>
    )
  }

  render() {
    const { focus, style, selectId, height, getRef, customHeader, renderOptionList, loading } = this.props
    const mergeStyle = Object.assign({}, { maxHeight: height, overflowY: 'auto' }, style)
    const result = (
      <>
        {customHeader}
        {this.renderTree()}
      </>
    )
    return (
      <ScaleList
        getRef={getRef}
        show={focus}
        style={mergeStyle}
        data-id={selectId}
        className={selectClass('options', 'tree')}
      >
        {getCustomList(result, renderOptionList, loading)}
      </ScaleList>
    )
  }
}

export default OptionList
