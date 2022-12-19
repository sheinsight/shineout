import React, { ComponentType, PureComponent } from 'react'
import config from '../config'
import { GetTrimProps, TrimProps } from './Props'

export default <T extends {}>(Origin: ComponentType<T>) =>
  (class Trim extends PureComponent<TrimProps> {
    constructor(props: TrimProps) {
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
      return <Origin {...this.props as T} onBlur={this.handleBlur} />
    }
  } as unknown) as ComponentType<GetTrimProps<T>>
