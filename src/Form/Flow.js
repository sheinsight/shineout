import { Component } from 'react'
import PropTypes from 'prop-types'
import { changeSubscribe, CHANGE_TOPIC } from '../Datum/types'

class Flow extends Component {
  constructor(props) {
    super(props)

    this.update = this.update.bind(this)
    this.events = []

    const { names, formDatum } = this.props
    if (names) {
      names.forEach((n) => {
        const nc = changeSubscribe(n)
        formDatum.subscribe(nc, this.update)
        this.events.push(nc)
      })
    } else {
      formDatum.subscribe(CHANGE_TOPIC, this.update)
      this.events.push(CHANGE_TOPIC)
    }
  }

  componentWillUnmount() {
    this.$willUnmount = true
    const { formDatum } = this.props
    this.events.forEach(n => formDatum.unsubscribe(n))
  }

  update() {
    if (this.$willUnmount) return
    this.forceUpdate()
  }

  render() {
    const { children, formDatum } = this.props
    return children(formDatum) || null
  }
}

Flow.propTypes = {
  children: PropTypes.func,
  formDatum: PropTypes.object.isRequired,
  names: PropTypes.array,
}

export default Flow
