import React from 'react'
import classnames from 'classnames'
import { treeClass } from './styles'
import List from './List'
import { isRTL } from '../config'
import { RootProps } from './Props'

function Root<DataItem, Value extends any[]>(props: RootProps<DataItem, Value>) {
  const className = classnames(treeClass('_', props.line ? 'with-line' : 'no-line', isRTL() && 'rtl'), props.className)

  return <List {...props} className={className} expanded path="" isRoot deepIndex={0} />
}

Root.defaultProps = {
  data: [],
  line: true,
}

export default Root
