import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

const PLACEHOLDER = 0
const SRC = 1
const ALT = 2
const ERROR = 3

class Image extends PureComponent {
  constructor(props) {
    super(props)

    this.state = {}
  }

  render() {
    return (
      <div />
    )
  }
}

Image.propTypes = {
  alt: PropTypes.string,
  className: PropTypes.string,
  height: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
  ]),
  href: PropTypes.string,
  lazy: PropTypes.bool,
  placeholder: PropTypes.element,
  shape: PropTypes.oneOf([
    'rounded',
    'circle',
    'thumbnail',
  ]),
  src: PropTypes.string,
  style: PropTypes.object,
  target: PropTypes.oneOf([
    '_blank',
    '_self',
    '_modal',
  ]),
  title: PropTypes.string,
  type: PropTypes.oneOf([
    'fill',
    'fit',
    'stretch',
    'center',
  ]),
  width: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
  ]),
}

Image.defaultProps = {
  lazy: false,
  target: '_modal',
  width: '100%',
}

export default Image
