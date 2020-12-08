import React from 'react'
import PropTypes from 'prop-types'
import { scrollClass } from '../styles'
import { compareColumns } from '../utils/shallowEqual'
import { Component } from '../component'

export default Table =>
  class extends Component {
    static propTypes = {
      fixed: PropTypes.oneOf(['x', 'y', 'both', 'auto']),
      data: PropTypes.array,
      columns: PropTypes.array,
    }

    constructor(props) {
      super(props)
      this.state = {
        fixed: null,
      }
      this.bindWrapper = this.bindWrapper.bind(this)
      this.resetAutoFixedState = this.resetAutoFixedState.bind(this)
    }

    componentDidUpdate(prevProps) {
      const diff = ['fixed', 'width', 'height', 'data'].find(k => this.props[k] && prevProps[k] !== this.props[k])
      const reset = !compareColumns(prevProps.columns, this.props.columns) || diff
      if (reset) {
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

    bindWrapper(wrapper) {
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
        <Table {...this.props} fixed={fixed} bindWrapper={this.bindWrapper} resetFixAuto={this.resetAutoFixedState} />
      )
    }
  }
