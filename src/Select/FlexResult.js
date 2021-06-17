import React from 'react'
import PropTypes from 'prop-types'
import More from './More'
import FlexBox from './FlexBox'
import { Component } from '../component'
import { selectClass } from '../styles'

const LETTER_WIDTH = 10

export default class FlexResult extends Component {
  constructor(props) {
    super(props)
    this.state = {
      count: props.result.length,
      compressedLeft: 0,
    }
    this.handleFlex = this.handleFlex.bind(this)
  }

  handleFlex(count, compressedLeft) {
    this.setState({
      count,
      compressedLeft,
    })
  }

  render() {
    const { result, className, compressed } = this.props
    const { compressedLeft, count } = this.state
    const beyondCount = result.length - count
    const content = `+${beyondCount}`
    return [
      <FlexBox addition={(content.length + 3) * LETTER_WIDTH} onFlex={this.handleFlex} key="flexbox">
        {result}
      </FlexBox>,
      beyondCount >= 1 && (
        <More
          style={{ left: compressedLeft }}
          key="more"
          className={selectClass('item', 'item-compressed')}
          popoverClassName={className}
          contentClassName={selectClass('result')}
          compressed={compressed}
          data={result}
          count={count}
          cls={selectClass}
        >
          {content}
        </More>
      ),
    ]
  }
}

FlexResult.propTypes = {
  result: PropTypes.array,
  className: PropTypes.string,
  compressed: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
}
