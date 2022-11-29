import React, { ComponentType } from 'react'
import { scrollClass } from '../Scroll/styles'
import { compareColumns } from '../utils/shallowEqual'
import { Component } from '../component'
import { GetFixAutoProps } from './Props'

interface BaseProps {
  fixed?: any
  columns?: any
  data?: any
  width?: any
  height?: any
}
export default <Props extends BaseProps>(Table: ComponentType<Props>) =>
  class AutoFixed extends Component<
    GetFixAutoProps<Props>,
    {
      fixed: 'x' | 'y' | 'both' | null
    }
  > {
    wrapper: HTMLDivElement

    constructor(props: GetFixAutoProps<Props>) {
      super(props)
      this.state = {
        fixed: null,
      }
      this.bindWrapper = this.bindWrapper.bind(this)
      this.resetAutoFixedState = this.resetAutoFixedState.bind(this)
    }

    componentDidUpdate(prevProps: GetFixAutoProps<Props>) {
      type PropsKey = keyof GetFixAutoProps<Props>
      const diff = ['fixed', 'width', 'height', 'data'].find(
        k => this.props[k as PropsKey] && prevProps[k as PropsKey] !== this.props[k as PropsKey]
      )
      const reset = !compareColumns(prevProps.columns, this.props.columns) || diff
      if (reset) {
        // eslint-disable-next-line react/no-did-update-set-state
        this.setState({
          fixed: null,
        })
      }
    }

    getFixed() {
      if (this.state.fixed !== null) return this.state.fixed
      if (this.props.fixed === 'auto') return 'both'
      return this.props.fixed
    }

    bindWrapper(wrapper: HTMLDivElement) {
      this.wrapper = wrapper
    }

    resetFixed() {
      if (!this.wrapper) return
      const verticalHandle = this.wrapper.querySelector(`.${scrollClass('y')}.${scrollClass('show')}`)
      const horizontalHandle = this.wrapper.querySelector(`.${scrollClass('x')}.${scrollClass('show')}`)
      if (verticalHandle && horizontalHandle) return
      let fixed
      if (horizontalHandle) fixed = 'x'
      else if (verticalHandle) fixed = 'y'
      this.setState({
        fixed,
      })
    }

    fixedAuto() {
      if (this.props.fixed !== 'auto' || this.state.fixed !== null) return
      this.resetFixed()
    }

    resetAutoFixedState() {
      this.setState({ fixed: null })
    }

    render() {
      const fixed = this.getFixed()
      setTimeout(this.fixedAuto.bind(this))
      return (
        <Table
          {...this.props as Props}
          fixed={fixed}
          bindWrapper={this.bindWrapper}
          resetFixAuto={this.resetAutoFixedState}
        />
      )
    }
  }
