import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { getProps } from '../utils/proptypes'
import Tr from './Tr'

class Tbody extends PureComponent {
  constructor(props) {
    super(props)

    this.state = {}

    this.renderTr = this.renderTr.bind(this)
  }

  renderTr(data, index) {
    const { columns, keygen } = this.props

    let key = index
    if (keygen) {
      key = typeof keygen === 'string' ? data[keygen] : keygen(data, index)
    }

    return <Tr key={key} columns={columns} data={data} index={index} />
  }

  render() {
    const { data } = this.props

    return (
      <tbody>
        {data.map(this.renderTr)}
      </tbody>
    )
  }
}

Tbody.propTypes = {
  ...getProps('keygen'),
  columns: PropTypes.array.isRequired,
  data: PropTypes.array.isRequired,
}

export default Tbody
