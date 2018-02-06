import PropTypes from 'prop-types'

export const propSets = {
  disabled: PropTypes.bool,
  keygen: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.func,
  ]),
  placeholder: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.element,
    PropTypes.func,
  ]),
  size: PropTypes.oneOf(['small', 'default', 'large']),
  type: PropTypes.oneOf(['primary', 'secondary', 'success', 'info', 'warning', 'error', 'danger', 'link']),
}

export function getProps(...args) {
  const props = {
    className: PropTypes.string,
    style: PropTypes.object,
  }
  args.forEach((name) => {
    const prop = args[name]
    if (prop) props[name] = args[name]
  })

  return props
}

export const defaultProps = {
  className: '',
  size: 'default',
  style: {},
  type: 'default',
}
