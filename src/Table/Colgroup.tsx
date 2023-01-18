import React from 'react'
import { ColgroupProps } from './Props'

interface ColgroupState {
  didShow: boolean
}
class Colgroup<DataItem> extends React.Component<ColgroupProps<DataItem>, ColgroupState> {
  constructor(props: ColgroupProps<DataItem>) {
    super(props)
    this.state = {
      didShow: false,
    }
  }

  componentDidUpdate() {
    const { colgroup, columns, resizable } = this.props
    if (!colgroup && resizable && this.state.didShow) {
      // eslint-disable-next-line react/no-did-update-set-state
      this.setState({ didShow: false })
      return
    }
    if (!resizable || this.state.didShow) return
    if (!colgroup || colgroup.length !== columns.length) return
    // eslint-disable-next-line react/no-did-update-set-state
    this.setState({ didShow: true })
  }

  render() {
    const { didShow } = this.state
    const { columns, colgroup } = this.props
    if (colgroup && colgroup.length === columns.length) {
      return (
        <colgroup>
          {colgroup.map((c, i) => {
            const last = colgroup.length - 1 === i
            if (didShow && last) return null
            return <col key={columns[i].key} style={{ width: c }} />
          })}
        </colgroup>
      )
    }
    return (
      <colgroup>
        {columns.map((c, i) => {
          const last = columns.length - 1 === i
          if (didShow && last) return null
          return <col key={c.key} style={{ width: c.width }} />
        })}
      </colgroup>
    )
  }
}

export default Colgroup
