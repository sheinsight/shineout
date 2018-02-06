import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

export default (Component) => {
  class Fetch extends PureComponent {
    constructor(props) {
      super(props)
      this.state = {
        loading: !!props.fetch,
      }
    }

    componentDidMount() {
      const { fetch } = this.props

      if (fetch) this.fetchData(fetch)
    }

    fetchData(fetch) {
      fetch.then((data) => {
        this.setState({ data, loading: false })
      })
    }

    render() {
      const { fetch, ...props } = this.props
      const { data, loading } = this.state

      return <Component data={data} {...props} loading={loading} />
    }
  }

  Fetch.propTypes = {
    fetch: PropTypes.object,
  }

  Fetch.defaultProps = {
    fetch: undefined,
  }

  return Fetch
}
