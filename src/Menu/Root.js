import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { defaultProps, getProps } from '../utils/proptypes'
import { menuClass } from '../styles'
import List from './List'
import { Provider } from './context'

class Root extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      activeKey: null,
    }

    this.checkActive = this.checkActive.bind(this)
    this.handleClick = this.handleClick.bind(this)
    this.renderItem = this.renderItem.bind(this)
    this.providerValue = {
      bindItem: this.bindItem.bind(this),
      unbindItem: this.unbindItem.bind(this),
    }

    this.items = {}
  }

  componentDidMount() {
    this.updateActive()
  }

  componentDidUpdate() {
    this.updateActive()
  }

  bindItem(id, update) {
    this.items[id] = update
    return this.checkActive
  }

  unbindItem(id) {
    delete this.items[id]
  }

  checkActive(id, data) {
    const { active } = this.props
    if (typeof active === 'function') {
      return active(data)
    }
    return id === this.state.activeKey
  }

  updateActive() {
    Object.keys(this.items).forEach((id) => {
      const update = this.items[id]
      update(this.checkActive, this.state.activeKey)
    })
  }

  handleClick(id, data) {
    const { onClick } = this.props
    this.setState({ activeKey: id })
    if (onClick) onClick(data)
  }

  renderItem(data) {
    const { renderItem } = this.props
    if (typeof renderItem === 'string') return data[renderItem]
    else if (typeof renderItem === 'function') return renderItem(data)
    return null
  }

  render() {
    const {
      keygen, data, mode, style, theme, defaultOpenKeys, inlineIndent, disabled,
    } = this.props

    const className = classnames(
      menuClass('_', 'root', mode, theme === 'dark' && 'dark'),
      this.props.className,
    )

    return (
      <Provider value={this.providerValue}>
        <List
          className={className}
          data={data}
          defaultOpenKeys={defaultOpenKeys}
          disabled={disabled}
          inlineIndent={inlineIndent}
          keygen={keygen}
          level={0}
          mode={mode}
          onClick={this.handleClick}
          path=""
          renderItem={this.renderItem}
          style={style}
          open
        />
      </Provider>
    )
  }
}

Root.propTypes = {
  ...getProps(PropTypes, 'style', 'keygen'),
  active: PropTypes.func,
  data: PropTypes.array,
  defaultOpenKeys: PropTypes.array,
  disabled: PropTypes.func,
  inlineIndent: PropTypes.number,
  mode: PropTypes.oneOf(['inline', 'vertical', 'horizontal']),
  onClick: PropTypes.func,
  renderItem: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.func,
  ]),
}

Root.defaultProps = {
  ...defaultProps,
  data: [],
  disabled: d => d.disabled,
  level: 0,
  keygen: 'id',
  mode: 'inline',
  inlineIndent: 24,
  active: () => false,
  renderItem: 'title',
  defaultOpenKeys: [],
  onClick: () => true,
}

export default Root
