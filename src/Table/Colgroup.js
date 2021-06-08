import React from 'react'
import PropTypes from 'prop-types'

class Colgroup extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      didShow: false,
    }
  }

  componentDidUpdate() {
    const { colgroup, columns, resizable } = this.props
    if (!colgroup && resizable && this.state.didShow) {
      this.setState({ didShow: false })
      return
    }
    if (!resizable || this.state.didShow) return
    if (!colgroup || colgroup.length !== columns.length) return
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

Colgroup.propTypes = {
  columns: PropTypes.array.isRequired,
  colgroup: PropTypes.array,
  resizable: PropTypes.oneOfType([PropTypes.bool, PropTypes.number]),
}

Colgroup.defaultProps = {
  colgroup: undefined,
}

export default Colgroup
