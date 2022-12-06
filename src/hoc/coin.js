import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

export default coinType => Origin =>
  class extends PureComponent {
    static propTypes = {
      value: PropTypes.any,
      type: PropTypes.string,
      coin: PropTypes.bool,
      onFocus: PropTypes.func,
      onBlur: PropTypes.func,
      onMouseDown: PropTypes.func,
      onMouseUp: PropTypes.func,
      onChange: PropTypes.func.isRequired,
    }

    static defaultProps = {
      coin: false,
    }

    constructor(props) {
      super(props)
      this.state = {
        showCoin: props.coin,
      }

      this.handleFocus = this.handleFocus.bind(this)
      this.handleBlur = this.handleBlur.bind(this)
      this.handleMouseDown = this.handleMouseDown.bind(this)
      this.handleMouseUp = this.handleMouseUp.bind(this)
    }

    getValue() {
      const { showCoin } = this.state
      const { value } = this.props
      if (showCoin && (value || value === 0)) {
        return `${value}`.replace(/\d+/, n => n.replace(/(\d)(?=(\d{3})+$)/g, $1 => `${$1},`))
      }
      if (value === 0) return 0
      return `${value || ''}`.replace(/,/g, '')
    }

    handleFocus(e) {
      const { onFocus } = this.props
      this.isFocus = true
      this.setState({ showCoin: false })
      if (onFocus) onFocus(e)
    }

    handleBlur(e) {
      const { onBlur } = this.props
      this.isFocus = false
      this.setState({ showCoin: true })
      if (onBlur) onBlur(e)
    }

    handleMouseDown(e) {
      const { onMouseDown } = this.props
      this.mouseDown = true
      this.setState({ showCoin: false })
      if (onMouseDown) onMouseDown(e)
    }

    handleMouseUp(e) {
      const { onMouseUp } = this.props
      if (this.mouseDown && !this.isFocus) {
        this.setState({ showCoin: true })
      }
      this.mouseDown = false
      if (onMouseUp) onMouseUp(e)
    }

    render() {
      const { coin, value, onFocus, onBlur, ...others } = this.props

      if (!coin) return <Origin {...this.props} coin={undefined} />
      if (coinType === 'input' && this.props.type !== 'number') return <Origin {...this.props} coin={undefined} />
      return (
        <Origin
          {...others}
          onMouseDown={this.handleMouseDown}
          onMouseUp={this.handleMouseUp}
          value={this.getValue()}
          onFocus={this.handleFocus}
          onBlur={this.handleBlur}
          coin
        />
      )
    }
  }
