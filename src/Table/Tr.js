import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { setTranslate } from '../utils/dom/translate'
import { tableClass } from '../styles'
import Td, { CLASS_FIXED_LEFT, CLASS_FIXED_RIGHT } from './Td'

class Tr extends PureComponent {
  constructor(props) {
    super(props)

    this.bindElement = this.bindElement.bind(this)
  }

  componentDidMount() {
    const { offsetLeft, offsetRight } = this.props
    console.log(offsetLeft, offsetRight)
    if (offsetLeft) {
      this.element.querySelectorAll(`.${tableClass(CLASS_FIXED_LEFT)}`)
        .forEach((td) => { setTranslate(td, `${offsetLeft}px`, '0') })
    }
    if (offsetRight) {
      this.element.querySelectorAll(`.${tableClass(CLASS_FIXED_RIGHT)}`)
        .forEach((td) => { setTranslate(td, `-${offsetRight}px`, '0') })
    }
  }

  bindElement(el) {
    this.element = el
  }

  render() {
    const {
      columns, data, index,
    } = this.props
    return (
      <tr ref={this.bindElement}>
        {columns.map(col => <Td {...col} data={data} index={index} />)}
      </tr>
    )
  }
}

Tr.propTypes = {
  columns: PropTypes.array.isRequired,
  data: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired,
  offsetLeft: PropTypes.number,
  offsetRight: PropTypes.number,
}

export default Tr
