import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { getProps, defaultProps } from '../utils/proptypes'
import { breadcrumbClass } from '../styles'
import { getKey } from '../utils/uid'

class Breadcrumb extends React.PureComponent {
  render() {
    const {
      data, separator, keygen, icon, title, url, renderItem,
    } = this.props
    const className = classnames(
      breadcrumbClass('_'),
      this.props.className,
    )
    return (
      <div className={className} style={this.props.style}>
        {
          data.map((da, index) => (
            <span key={getKey(da, keygen, index)}>
              {
                renderItem ? renderItem(da) : (<span><a href={da[url] ? da[url] : 'javascript:;'}>{da[icon]}{da[title]}</a></span>)
              }
              {
                index !== data.length - 1 ?
                  <span>{separator}</span> : null
              }
            </span>
          ))
        }
      </div>)
  }
}

Breadcrumb.propTypes = {
  ...getProps(PropTypes, 'keygen'),
  dataSource: PropTypes.array,
  separator: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.element,
  ]),
  icon: PropTypes.string,
  title: PropTypes.string,
  url: PropTypes.string,
}

Breadcrumb.defaultProps = {
  ...defaultProps,
  dataSource: [],
  separator: '/',
  keygen: 'id',
  icon: 'icon',
  title: 'title',
  url: 'url',
}

export default Breadcrumb
