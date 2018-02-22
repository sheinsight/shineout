import PropTypes from 'prop-types'

export default {
  className: PropTypes.string,
  color: PropTypes.string,
  margin: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  size: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  spinClass: PropTypes.func,
}
