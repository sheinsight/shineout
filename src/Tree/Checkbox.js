import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import Checkbox from '../Checkbox/Checkbox'
import { treeClass } from '../styles'

export default class extends PureComponent {
  static propTypes = {
    datum: PropTypes.object.isRequired,
    id: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props)
    this.handleChange = this.handleChange.bind(this)
    props.datum.bind(props.id, this.update.bind(this))
  }

  componentWillUnmount() {
    this.props.datum.unbind(this.props.id)
  }

  update() {
    this.forceUpdate()
  }

  handleChange(v, checked) {
    const { datum, id, onChange } = this.props
    datum.set(id, checked ? 1 : 0)
    onChange(datum.getValue())
  }

  render() {
    const { datum, id } = this.props
    const checked = datum.getChecked(id)

    return (
      <Checkbox
        checked={checked}
        onChange={this.handleChange}
        className={treeClass('checkbox')}
      />
    )
  }
}
