import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { getProps, defaultProps } from '../utils/proptypes'
import { paginationClass } from '../styles'
import Links from './Links'

class Pagination extends PureComponent {
  render() {
    const { layout, style } = this.props
    const className = classnames(
      paginationClass('_'),
      this.props.className,
    )

    return (
      <div className={className} style={style}>
        {
          layout.map((key) => {
            switch (key) {
              case 'links':
                return <Links key={key} {...this.props} />
              default:
                return null
            }
         })
       }
      </div>
    )
  }
}

Pagination.propTypes = {
  ...getProps('size', 'type'),
  current: PropTypes.number.isRequired,
  layout: PropTypes.array,
  onChange: PropTypes.func.isRequired,
  pageSize: PropTypes.number.isRequired,
  span: PropTypes.number,
  text: PropTypes.object,
  total: PropTypes.number.isRequired,
}

Pagination.defaultProps = {
  ...defaultProps,
  layout: ['links'],
  span: 5,
  text: {},
}

export default Pagination
