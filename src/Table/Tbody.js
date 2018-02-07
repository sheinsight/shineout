import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { getProps } from '../utils/proptypes'
import Tr from './Tr'

class Tbody extends PureComponent {
  constructor(props) {
    super(props)

    this.state = {}

    this.bindBody = this.bindBody.bind(this)
    this.renderTr = this.renderTr.bind(this)
  }

  componentDidMount() {
    const { onBodyRender } = this.props
    if (onBodyRender) {
      const tds = this.body.querySelector('tr').querySelectorAll('td')
      onBodyRender(tds)
    }
  }

  bindBody(el) {
    this.body = el
  }

  renderTr(data, index) {
    const { columns, keygen, scrollX } = this.props

    let key = index
    if (keygen) {
      key = typeof keygen === 'string' ? data[keygen] : keygen(data, index)
    }

    return <Tr key={key} scrollX={scrollX} columns={columns} data={data} index={index} />
  }

  render() {
    const { data } = this.props

    return (
      <tbody ref={this.bindBody}>
        {data.map(this.renderTr)}
      </tbody>
    )
  }
}

Tbody.propTypes = {
  ...getProps('keygen'),
  columns: PropTypes.array.isRequired,
  data: PropTypes.array.isRequired,
  onBodyRender: PropTypes.func,
  scrollX: PropTypes.number,
}

Tbody.defaultProps = {
  onBodyRender: undefined,
}

export default Tbody
