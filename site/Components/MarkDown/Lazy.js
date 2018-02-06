import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import MarkDown from './MarkDown'
import Loading from '../Loading'

export default function () {
  class Lazy extends PureComponent {
    constructor(props) {
      super(props)
      this.state = {
        source: this.props.source,
      }
    }

    componentDidMount() {
      if (this.props.loader) {
        this.props.loader().then((source) => {
          this.setState({ source })
        })
      }
    }

    render() {
      const { source } = this.state
      if (!source) return <Loading style={{ minHeight: 200 }} />

      return <MarkDown {...this.props} source={source} />
    }
  }

  Lazy.propTypes = {
    loader: PropTypes.func,
    source: PropTypes.string,
  }

  Lazy.defaultProps = {
    loader: undefined,
    source: undefined,
  }

  return Lazy
}
