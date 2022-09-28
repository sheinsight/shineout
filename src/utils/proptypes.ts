import React from 'react'

export interface defaultProptypes {
  className: string
  size: string
  style: React.CSSProperties
  type: string
}

interface propSets {
  [x: string]: any
}

export function getProps(PropTypes: any, ...args: any) {
  const props: propSets = {
    className: PropTypes.string,
    style: PropTypes.object,
  }

  const propSets: propSets = {
    disabled: PropTypes.bool,
    keygen: PropTypes.oneOfType([PropTypes.string, PropTypes.func, PropTypes.bool]).isRequired,
    grid: PropTypes.oneOfType([PropTypes.number, PropTypes.object]),
    placeholder: PropTypes.oneOfType([PropTypes.string, PropTypes.element, PropTypes.func]),
    size: PropTypes.oneOf(['small', 'default', 'large']),
    type: PropTypes.oneOf([
      'info',
      'link',
      'error',
      'danger',
      'primary',
      'warning',
      'default',
      'success',
      'secondary',
      'confirmwarning',
    ]),
  }

  args.forEach((name: string) => {
    const prop = propSets[name]
    if (prop) props[name] = prop
  })

  return props
}

export const defaultProps: defaultProptypes = {
  className: '',
  size: 'default',
  style: {},
  type: 'default',
}
