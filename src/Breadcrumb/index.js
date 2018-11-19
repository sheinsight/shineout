import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { getProps, defaultProps } from '../utils/proptypes'
import { breadcrumbClass } from '../styles'
import { getKey } from '../utils/uid'

class Breadcrumb extends React.PureComponent {
  render() {
    const {
      data, separator, keygen, renderItem,
    } = this.props

    const className = classnames(
      breadcrumbClass('_'),
      this.props.className,
    )

    return (
      <div className={className} style={this.props.style}>
        {
          data.map((d, index) => {
            let item = d.title
            if (!React.isValidElement(item)) {
              if (d.onClick || d.url) {
                item = <a onClick={d.onClick} href={d.url ? d.url : 'javascript:;'}>{d.icon} {d.title}</a>
              } else {
                item = <b>{d.title}</b>
              }
            }
            return (
              <span key={getKey(d, keygen, index)}>
                { renderItem ? renderItem(d) : item }
                { index !== data.length - 1 ? <span>{separator}</span> : null }
              </span>
            )
          })
        }
      </div>)
  }
}

Breadcrumb.propTypes = {
  ...getProps(PropTypes),
  dataSource: PropTypes.array,
  renderItem: PropTypes.func,
  separator: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.element,
  ]),
}

Breadcrumb.defaultProps = {
  ...defaultProps,
  dataSource: [],
  separator: '/',
}

Breadcrumb.displayName = 'ShineoutBreadcrumb'

export default Breadcrumb
