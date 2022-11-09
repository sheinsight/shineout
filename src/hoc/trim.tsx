import React, { PureComponent } from 'react'
import config from '../config'

interface TrimProps {
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void
  onChange?: (v: string) => void
  trim?: boolean
  value?: string
}
export default <T extends TrimProps>(Origin: React.ComponentType<T>) =>
  class extends PureComponent<T> {
    constructor(props: T) {
      super(props)
      this.handleBlur = this.handleBlur.bind(this)
    }

    getTrim() {
      const { trim } = this.props
      if (trim !== undefined) return trim
      if (config.trim !== undefined) return config.trim
      return false
    }

    handleBlur(e: React.FocusEvent<HTMLInputElement>) {
      const { value, onBlur, onChange } = this.props
      const trim = this.getTrim()
      if (trim) {
        const tv = (e.target as HTMLInputElement).value.trim()
        if (value !== tv && onChange) onChange(tv)
      }
      if (onBlur) onBlur(e)
    }

    render() {
      return <Origin {...this.props} onBlur={this.handleBlur} />
    }
  }
