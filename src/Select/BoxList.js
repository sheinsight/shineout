import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { selectClass } from '../styles'

const emptyFunc = () => {}

class BoxList extends PureComponent {
  constructor(props) {
    super(props)

    this.state = {}

    // fake events
    props.bindOptionFunc('handleHover', emptyFunc)
    props.bindOptionFunc('hoverMove', emptyFunc)
    props.bindOptionFunc('getIndex', emptyFunc)
  }

  render() {
    const className = classnames(
      selectClass('box-list'),
      this.props.className,
    )
    return (
      <div className={className}>
        box list
      </div>
    )
  }
}

BoxList.propTypes = {
  className: PropTypes.string,
  columnWidth: PropTypes.number,
  columns: PropTypes.number,
  data: PropTypes.array,
  datum: PropTypes.object.isRequired,
  absolute: PropTypes.bool,
  focus: PropTypes.bool,
  height: PropTypes.number,
  itemsInView: PropTypes.number,
  keygen: PropTypes.any,
  lineHeight: PropTypes.number,
  loading: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.bool,
  ]),
  multiple: PropTypes.bool,
  onControlChange: PropTypes.func,
  onChange: PropTypes.func,
  renderItem: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.func,
  ]),
  renderPending: PropTypes.bool,
  selectId: PropTypes.string,
  bindOptionFunc: PropTypes.func.isRequired,
  style: PropTypes.object,
  text: PropTypes.object,
}

BoxList.defaultProps = {
  columnWidth: 160,
}

export default BoxList
