import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

export default coinType => Origin => class extends PureComponent {
  static propTypes = {
    value: PropTypes.any,
    coin: PropTypes.bool,
    onFocus: PropTypes.func,
    onBlur: PropTypes.func,
    onChange: PropTypes.func.isRequired,
  }

  static defaultProps = {
    coin: false
  }

  constructor(props) {
    super(props)
    this.state = {
      showCoin: props.coin
    }

    this.handleFocus = this.handleFocus.bind(this)
    this.handleBlur = this.handleBlur.bind(this)
    this.handleMouseDown = this.handleMouseDown.bind(this)
    this.handleMouseUp = this.handleMouseUp.bind(this)
  }

  handleFocus(e) {
    const { onFocus } = this.props
    this.isFocus = true
    this.setState({ showCoin: false })
    onFocus && onFocus(e)
  }

  handleBlur(e) {
    const { onBlur } = this.props
    this.isFocus = false
    if (!this.mouseDown) this.setState({ showCoin: true })
    onBlur && onBlur(e)
  }
  
  handleMouseDown(e) {
    const { onMouseDown } = this.props
    this.mouseDown = true
    this.setState({ showCoin: false })
    onMouseDown && onMouseDown(e)
  }

  handleMouseUp(e) {
    const { onMouseUp } = this.props
    if (this.mouseDown && !this.isFocus) { this.setState({ showCoin: true }) }
    this.mouseDown = false
    onMouseUp && onMouseUp(e)
  }

  getValue() {
    const { showCoin } = this.state;
    const { value } = this.props;
    if (showCoin && (value || value === 0)) {
      return `${value}`.replace(/\d+/, function(n){
        return n.replace(/(\d)(?=(\d{3})+$)/g,function($1){
          return $1+",";
        });
      })
    }
    if (value === 0) return 0;
    return `${value || ''}`.replace(/,/g, '')
  }

  render() {
    const { coin, value, onFocus, onBlur, ...others } = this.props

    if (!coin) return <Origin  {...this.props} coin={undefined} />
    if (coinType === 'input' && this.props.type !== 'number') return <Origin  {...this.props} coin={undefined} />
    return (
      <Origin 
        {...others}
        onMouseDown={this.handleMouseDown}
        onMouseUp={this.handleMouseUp}
        value={this.getValue()}
        onFocus={this.handleFocus}
        onBlur={this.handleBlur}
      />
    )
  }
}