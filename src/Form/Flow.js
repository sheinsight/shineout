import PropTypes from 'prop-types'
import { Component } from '../component'
import { changeSubscribe, CHANGE_TOPIC } from '../Datum/types'
import { isFunc } from '../utils/is'

class Flow extends Component {
  constructor(props) {
    super(props)

    this.update = this.forceUpdate.bind(this)
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
    super.componentWillUnmount()
    const { formDatum } = this.props
    this.events.forEach(n => formDatum.unsubscribe(n))
  }

  render() {
    const { children, formDatum } = this.props

    if (isFunc(children)) return children(formDatum) || null

    return children
  }
}

Flow.propTypes = {
  children: PropTypes.any,
  formDatum: PropTypes.object.isRequired,
  names: PropTypes.array,
}

export default Flow
