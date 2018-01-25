import PropTypes from 'prop-types'

export const styleProps = {
  className: PropTypes.string,
  style: PropTypes.object,
}

export const placeholderProps = {
  placeholder: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.element,
  ]),
}

export const defaultStyleProps = {
  className: '',
  style: {},
}
