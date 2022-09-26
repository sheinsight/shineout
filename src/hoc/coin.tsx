import React, { PureComponent } from 'react'

type CoinTypeType = 'input' | undefined
interface CoinProps {
  value?: string | number
  type?: string
  onFocus?: React.FocusEventHandler<HTMLElement>
  onBlur?: React.FocusEventHandler<HTMLElement>
  onMouseDown?: React.MouseEventHandler<HTMLElement>
  onMouseUp?: React.MouseEventHandler<HTMLElement>
  onChange: (value: string) => void
  coin?: boolean
}

type filterProps = 'coin'

interface CoinState {
  showCoin?: boolean
}
export default <T extends CoinProps>(coinType: CoinTypeType) => (Origin: React.ComponentType<Omit<T, filterProps>>) =>
  class extends PureComponent<T, CoinState> {
    static defaultProps = {
      coin: false,
    }

    isFocus: boolean

    mouseDown: boolean

    constructor(props: T) {
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

    handleFocus(e: React.FocusEvent<HTMLElement>) {
      const { onFocus } = this.props
      this.isFocus = true
      this.setState({ showCoin: false })
      if (onFocus) onFocus(e)
    }

    handleBlur(e: React.FocusEvent<HTMLElement>) {
      const { onBlur } = this.props
      this.isFocus = false
      this.setState({ showCoin: true })
      if (onBlur) onBlur(e)
    }

    handleMouseDown(e: React.MouseEvent<HTMLElement>) {
      const { onMouseDown } = this.props
      this.mouseDown = true
      this.setState({ showCoin: false })
      if (onMouseDown) onMouseDown(e)
    }

    handleMouseUp(e: React.MouseEvent<HTMLElement>) {
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
      if (coinType === 'input' && this.props.type !== 'number') return <Origin {...this.props} coin={123} />
      return (
        <Origin
          {...others as T}
          onMouseDown={this.handleMouseDown}
          onMouseUp={this.handleMouseUp}
          value={this.getValue()}
          onFocus={this.handleFocus}
          onBlur={this.handleBlur}
        />
      )
    }
  }
