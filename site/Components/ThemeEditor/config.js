import React from 'react'
import PropTypes from 'prop-types'

export default (type, getter) => WrappedComponent => {
  const setterName = `set${type.replace(/^\S/, s => s.toUpperCase())}`
  return class ConfigHOC extends React.Component {
    static propTypes = {
      setConfig: PropTypes.func,
      config: PropTypes.object,
    }

    constructor(props) {
      super(props)
      this.handleChange = this.handleChange.bind(this)
      this.getDefaultConfig()
    }

    componentDidUpdate() {
      const { config } = this.props
      if (!config[type]) this.reset()
    }

    getDefaultConfig() {
      const { setConfig } = this.props
      this.conf = { ...getter }
      delete this.conf[setterName]
      setConfig(type, this.conf)
      this.defaultConf = { ...this.conf }
    }

    reset() {
      const { setConfig } = this.props
      setConfig(type, this.defaultConf)
      getter[setterName](this.defaultConf)
    }

    handleChange(v) {
      const { setConfig } = this.props
      setConfig(type, v)
      getter[setterName](v)
    }

    render() {
      return <WrappedComponent {...this.props} field={type} onChange={this.handleChange} />
    }
  }
}
