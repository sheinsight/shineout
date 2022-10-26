import React, { PureComponent } from 'react'
import config from '../config'

export interface BaseProps {
  value?: string
  onBlur?: (e: any) => void
  onChange?: (v: string) => void
}

export type GetTrimProps<U> = U & { trim?: boolean }

export default <T extends BaseProps>(Origin: React.ComponentType<T>) =>
  class extends PureComponent<GetTrimProps<T>> {
    constructor(props: GetTrimProps<T>) {
      super(props)
      this.handleBlur = this.handleBlur.bind(this)
    }

    getTrim() {
      const { trim } = this.props
      if (trim !== undefined) return trim
      if (config.trim !== undefined) return config.trim
      return false
    }

    handleBlur(e: React.MouseEvent<HTMLInputElement>) {
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
