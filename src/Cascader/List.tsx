import React, { Component } from 'react'
import { cascaderClass } from './styles'
import Node from './Node'
import { getLocale } from '../locale'
import DatumTree from '../Datum/Tree'
import { CascaderProps } from './interface'
import { getDirectionClass } from '../utils/classname'
import { keyType } from '../@types/common'

interface ListProps<U, T> extends CascaderProps<U, T> {
  id: string
  parentId: string
  keygen: any
  path: string[]
  active?: boolean
  datum: DatumTree
  text?: any
  onNodeClick?: (node: U) => void
}

const DefaultProps = {
  id: '',
  parentId: '',
  text: {},
}

type Props<U, T> = ListProps<U, T> & Required<Pick<ListProps<U, T>, keyof typeof DefaultProps>>

class List<U extends { [children: string]: U[] }, T extends string[]> extends Component<Props<U, T>> {
  static defaultProps = DefaultProps

  constructor(props: Props<U, T>) {
    super(props)

    this.state = {}
    this.getText = this.getText.bind(this)
  }

  getKey(data: U, index: number) {
    const { keygen, parentId } = this.props
    if (typeof keygen === 'function') return keygen(data, parentId)
    if (keygen && typeof keygen === 'string') return data[keygen as keyof U]
    return parentId + (parentId ? ',' : '') + index
  }

  getText(key: string) {
    return this.props.text[key] || getLocale(key)
  }

  render() {
    const { data, ...other } = this.props
    if (!data || data.length === 0) return <span className={cascaderClass('no-data')}>{this.getText('noData')}</span>
    return (
      <div className={cascaderClass(getDirectionClass('list'))}>
        {data.map((d, i) => {
          const id = this.getKey(d, i)
          return <Node {...other} key={id as keyType} active={other.id === id} id={id} data={d} />
        })}
      </div>
    )
  }
}

export default List
