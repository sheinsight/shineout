import PropTypes from 'prop-types'

const propSets = {
  disabled: PropTypes.bool,
  keygen: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.func,
  ]),
  grid: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.object,
  ]),
  placeholder: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.element,
    PropTypes.func,
  ]),
  size: PropTypes.oneOf(['small', 'default', 'large']),
  type: PropTypes.oneOf([
    'primary', 'default', 'secondary', 'success', 'info',
    'warning', 'error', 'danger', 'link',
  ]),
}

export function getProps(...args) {
  const props = {
    className: PropTypes.string,
    style: PropTypes.object,
  }
  args.forEach((name) => {
    const prop = propSets[name]
    if (prop) props[name] = prop
  })

  return props
}

export const defaultProps = {
  className: '',
  size: 'default',
  style: {},
  type: 'default',
}
