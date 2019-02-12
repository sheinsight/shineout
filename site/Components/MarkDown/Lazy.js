import React, { useState, useEffect, memo } from 'react'
import PropTypes from 'prop-types'
import MarkDown from './MarkDown'
import Loading from '../Loading'

export default function() {
  const Lazy = props => {
    const [source, setSource] = useState(props.source)

    useEffect(() => {
      if (props.loader) {
        props.loader().then(s => {
          setSource(s.default)
        })
      }
    }, [])

    if (!source) return <Loading style={{ minHeight: 200 }} />

    return <MarkDown {...props} source={source} />
  }

  Lazy.propTypes = {
    loader: PropTypes.func,
    source: PropTypes.string,
  }

  Lazy.defaultProps = {
    loader: undefined,
    source: undefined,
  }

  return memo(Lazy)
}
