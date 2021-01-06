import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import createReactContext from 'create-react-context'
import classnames from 'classnames'
import immer from 'immer'
import { Component } from '../component'
import { errorSubscribe, RESET_TOPIC } from '../Datum/types'
import { getGrid } from '../Grid/utils'
import { getProps, defaultProps } from '../utils/proptypes'
import { objectValues } from '../utils/objects'
import { formClass } from '../styles'

const { Provider, Consumer } = createReactContext()

class Label extends PureComponent {
  static propTypes = {
    children: PropTypes.any,
    width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  }

  render() {
    const { width, children } = this.props
    if (children === undefined) return null

    return (
      <div style={{ width }} className={formClass('label')}>
        {children}
      </div>
    )
  }
}

// eslint-disable-next-line
class Item extends Component {
  constructor(props) {
    super(props)

    this.state = {
      inputs: {},
      errors: {},
    }
    this.events = {
      bindInputToItem: this.bind.bind(this),
      unbindInputFromItem: this.unbind.bind(this),
      onItemError: this.handleError.bind(this),
    }
    this.handleUpdate = this.handleUpdate.bind(this)

    if (props.formDatum) props.formDatum.subscribe(RESET_TOPIC, this.handleUpdate)
  }

  getErrors() {
    const { formDatum } = this.props
    const errors = []

    if (formDatum) {
      Object.keys(this.state.inputs).forEach(name => {
        const err = formDatum.getError(name)
        if (err) errors.push(err)
      })
    }

    objectValues(this.state.errors).forEach(err => {
      if (err) errors.push(err)
    })

    return errors
  }

  handleUpdate() {
    if (this.updateTimer) clearTimeout(this.updateTimer)
    this.updateTimer = setTimeout(() => {
      this.forceUpdate()
    })
  }

  bind(name) {
    const names = Array.isArray(name) ? name : [name]
    const { formDatum } = this.props
    if (formDatum) {
      names.forEach(n => {
        formDatum.subscribe(errorSubscribe(n), this.handleUpdate)
      })
    }

    this.setState(
      immer(state => {
        names.forEach(n => {
          state.inputs[n] = true
        })
      })
    )
  }

  unbind(name) {
    const names = Array.isArray(name) ? name : [name]
    const { formDatum } = this.props
    if (formDatum) {
      names.forEach(n => {
        formDatum.unsubscribe(errorSubscribe(n))
      })
    }

    this.setState(
      immer(state => {
        names.forEach(n => {
          delete state.inputs[n]
        })
      })
    )
  }

  handleError(name, error) {
    this.setState(
      immer(state => {
        state.errors[name] = error
      })
    )
  }

  renderHelp(errors) {
    if (errors.length > 0) {
      return (
        <div className={formClass('error')}>
          {errors.map((e, i) => (
            <div key={i}>{e.message}</div>
          ))}
        </div>
      )
    }

    const { tip } = this.props
    if (!tip) return null
    return <div className={formClass('tip')}>{tip}</div>
  }

  render() {
    const { children, grid, label, labelAlign, labelVerticalAlign, labelWidth, required, style } = this.props

    const errors = this.getErrors()
    const className = classnames(
      getGrid(grid),
      formClass(
        'item',
        required && 'required',
        errors.length > 0 && 'invalid',
        labelVerticalAlign && `label-vertical-align-${labelVerticalAlign}`,
        ['top', 'right', 'left'].indexOf(labelAlign) >= 0 && `label-align-${labelAlign}`
      ),
      this.props.className
    )

    return (
      <Provider value={this.events}>
        <div className={className} style={style}>
          <Label width={labelWidth}>{label}</Label>
          <div className={formClass('control')}>
            {children}
            {this.renderHelp(errors)}
          </div>
        </div>
      </Provider>
    )
  }
}

Item.propTypes = {
  ...getProps(PropTypes, 'children', 'grid'),
  className: PropTypes.string,
  // formItemErrors: PropTypes.array,
  label: PropTypes.any,
  labelAlign: PropTypes.string,
  labelWidth: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  required: PropTypes.bool,
  tip: PropTypes.any,
}

Item.defaultProps = {
  ...defaultProps,
  formItemErrors: [],
}

export default Item

// eslint-disable-next-line
export const itemConsumer = Origin => (props) => {
  return <Consumer>{events => <Origin {...props} {...events} />}</Consumer>
}
