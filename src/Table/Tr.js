import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import Td from './Td'

class Tr extends PureComponent {
  render() {
    const {
      columns, data, index, scrollX,
    } = this.props
    return (
      <tr>
        {columns.map(col => <Td {...col} scrollX={scrollX} data={data} index={index} />)}
      </tr>
    )
  }
}

Tr.propTypes = {
  columns: PropTypes.array.isRequired,
  data: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired,
}

export default Tr
