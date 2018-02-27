import React from 'react'
import PropTypes from 'prop-types';
import { getProps, defaultProps } from '../utils/proptypes'
import { breadcrumbClass } from '../styles'

class Breadcrumb extends React.PureComponent {
  render() {
    const {
      dataSource, type, separator, className,
    } = this.props
    let warpClassName = breadcrumbClass('_', type)
    if (className) {
      warpClassName += ` ${className}`
    }
    return (
      <div className={warpClassName} >
        {
          dataSource.map((data, index) => (
            <span key={index}>
              <span><a href={data.url ? data.url : 'javascript:;'}>{data.icon}{data.title}</a></span>
              {
                index !== dataSource.length - 1 ?
                  <span>{separator}</span> : null
              }
            </span>
          ))
        }
      </div>)
  }
}

Breadcrumb.propTypes = {
  ...getProps(),
  dataSource: PropTypes.array,
  separator: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.element,
  ]),
  icon: PropTypes.element,
}

Breadcrumb.defaultProps = {
  ...defaultProps,
  dataSource: [],
  separator: '/',
}

export default Breadcrumb
