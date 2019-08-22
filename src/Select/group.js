import React from 'react'
import PropTypes from 'prop-types'

export default Origin =>
  class extends React.Component {
    static propTypes = {
      data: PropTypes.array,
      groupBy: PropTypes.func,
    }

    static defaultProps = {
      data: [],
    }

    constructor(props) {
      super(props)
      this.state = {
        data: [],
      }
      this.groupByData = this.groupByData.bind(this)
    }

    componentDidMount() {
      this.groupByData()
    }

    componentDidUpdate(prevProps) {
      if (prevProps.data !== this.props.data) this.groupByData()
    }

    groupByData() {
      const { groupBy, data } = this.props

      if (typeof groupBy !== 'function') {
        this.setState({ data })
        return
      }

      const groupData = {}

      data.forEach((d, i) => {
        const g = groupBy(d, i, data)
        if (!groupData[g]) groupData[g || ''] = g ? [{ $$group: g }] : []
        groupData[g].push(d)
      })

      this.setState({
        data: Object.keys(groupData).reduce((p, v) => (v ? p.concat(groupData[v]) : groupData[v].concat(p)), []),
      })
    }

    render() {
      const { groupBy, data, ...props } = this.props
      return <Origin {...props} data={this.state.data} />
    }
  }
